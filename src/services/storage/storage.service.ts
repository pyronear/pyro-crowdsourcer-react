import axios, { AxiosHeaderValue } from 'axios'
import { CreateMediaResponseDTO, GetMediaUrlDTO, LoginResponseDTO, CreateAnnotationResponseDTO } from './storage-api.dto'
export class StorageService {
  private readonly storageUrl = process.env.REACT_APP_STORAGE_URL as string
  private readonly storagePort = process.env.REACT_APP_STORAGE_PORT as string
  private readonly username = process.env.REACT_APP_STORAGE_USERNAME as string
  private readonly password = process.env.REACT_APP_STORAGE_PASSWORD as string
  private bearer: string | null = null

  private generateHeaders (): { Authorization: AxiosHeaderValue } {
    return { Authorization: `Bearer ${this.bearer as string}` }
  }

  private async initialize (): Promise<void> {
    const loginFormData = new FormData()
    loginFormData.append('username', this.username)
    loginFormData.append('password', this.password)
    const resp = await axios.post<LoginResponseDTO>(
      `${this.storageUrl}:${this.storagePort}/login/access-token`,
      loginFormData
    )
    this.bearer = resp.data.access_token
  }

  private async createMedia (): Promise<number> {
    const resp = await axios.post<CreateMediaResponseDTO>(
      `${this.storageUrl}:${this.storagePort}/media`,
      {},
      { headers: this.generateHeaders() }
    )
    return resp.data.id
  }

  private async uploadImageToMedia (mediaId: number, image: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', image)
    await axios.post<CreateMediaResponseDTO>(
      `${this.storageUrl}:${this.storagePort}/media/${mediaId}/upload`,
      formData,
      { headers: this.generateHeaders() }
    )
  }

  private async getMediaUrl (mediaId: number): Promise<string> {
    const resp = await axios.get<GetMediaUrlDTO>(
      `${this.storageUrl}:${this.storagePort}/media/${mediaId}/url`,
      { headers: this.generateHeaders() }
    )
    return resp.data.url
  }

  private async uploadMedia (image: File): Promise<{ mediaId: number, mediaUrl: string }> {
    const mediaId = await this.createMedia()
    await this.uploadImageToMedia(mediaId, image)
    const mediaUrl = await this.getMediaUrl(mediaId)
    return { mediaId, mediaUrl }
  }

  private async createAnnotation (mediaId: number): Promise<number> {
    const resp = await axios.post<CreateAnnotationResponseDTO>(
      `${this.storageUrl}:${this.storagePort}/annotations`,
      { media_id: mediaId },
      { headers: this.generateHeaders() }
    )
    return resp.data.id
  }

  private async uploadObservationsToAnnotation (annotationId: number, observations: string[]): Promise<void> {
    const formData = new FormData()
    const observationAsString = JSON.stringify(observations)

    const blob = new Blob([observationAsString], {
      type: 'application/json' // or whatever your Content-Type is
    })
    formData.append('file', blob, 'observations.json')

    await axios.post<CreateAnnotationResponseDTO>(
      `${this.storageUrl}:${this.storagePort}/annotations/${annotationId}/upload`,
      formData,
      { headers: this.generateHeaders() }
    )
  }

  private async addAnnotations (mediaId: number, observations: string[]): Promise<void> {
    const annotationId = await this.createAnnotation(mediaId)
    await this.uploadObservationsToAnnotation(annotationId, observations)
  }

  public async uploadMediaWithAnnotations (image: File, observations: string[]): Promise<string> {
    await this.initialize()
    const { mediaId, mediaUrl } = await this.uploadMedia(image)
    await this.addAnnotations(mediaId, observations)
    return mediaUrl
  }
}
