export interface LoginResponseDTO {
  access_token: string
  token_type: 'bearer'
}

export interface CreateMediaResponseDTO {
  'id': number
  'created_at': string // ISO 8601
  'type': 'image'
}

export interface GetMediaUrlDTO {
  'url': string
}

export interface CreateAnnotationResponseDTO {
  'id': number
  'created_at': string // ISO 8601
  'media_id': number
}
