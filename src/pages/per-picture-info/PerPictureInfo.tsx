import { faPencil } from '@fortawesome/free-solid-svg-icons'
import './PerPictureInfo.scss'
import { useEffect, useState } from 'react'
import { GlobalInfoData } from '../global-info/GlobalInfo'
import { AllTags } from './tags/resources/tags'
import { ModalRef } from '../../modals/Modal'
import { ALL_TAGS_TO_FALSE, TagState, Tags } from './tags/Tags'
import { PictureInfoEditModal, PictureInfoEditModalContext } from './PictureInfoEditModal'
import { PictureSelector } from './picture-selector/PictureSelector'
import { Pill } from '../../generic-components/pill/Pill'
import { Button } from '../../generic-components/button/Button'

export type PictureInfo = GlobalInfoData & {
  file: File
  tags: Record<AllTags, boolean>
}

export const PerPictureInfo = ({
  globalInfo,
  imageUploads,
  modalRef,
  isMobile,
  onSubmit
}: {
  globalInfo: GlobalInfoData
  imageUploads: File[]
  modalRef: ModalRef
  isMobile: boolean
  onSubmit: (picturesInfo: PictureInfo[]) => Promise<void>
}): JSX.Element => {
  const [perPictureInfo, setPerPictureInfo] = useState<PictureInfo[]>([])
  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0)
  const [currentPictureDeleting, setCurrentPictureDeleting] = useState<boolean>(false)
  const [picturesLeftToTagCount, setPicturesLeftToTagCount] = useState<number | null>(null)
  const [firstInvalidPictureIndex, setFirstInvalidPictureIndex] = useState<number | null>(null)

  const [isReady, setIsReady] = useState(false)

  const setTagEnabled = (tagEnabled: TagState): void => {
    patchInfo({ tags: tagEnabled })
  }

  const formatDate = (date: Date): string => date.toLocaleDateString('fr-FR')
  const formatTime = (date: Date): string => date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })

  const patchInfo = (info: Partial<PictureInfo>): void => {
    const previousPerPictureInfo = perPictureInfo
    previousPerPictureInfo[currentPictureIndex] = { ...previousPerPictureInfo[currentPictureIndex], ...info }
    setPerPictureInfo([...previousPerPictureInfo]) // Shallow-ish copy to trigger repaint
  }

  const onPillClick = (): void => {
    const modalContext: PictureInfoEditModalContext = { ...perPictureInfo[currentPictureIndex], patchInfo }
    modalRef.open(PictureInfoEditModal, modalContext)
  }

  const buildInitialPerPictureInforFromGlobalInfo = (): void => {
    const perPictureInfoBuilder: PictureInfo[] = []
    for (let pictureIndex = 0; pictureIndex < imageUploads.length; pictureIndex++) {
      perPictureInfoBuilder.push({
        ...globalInfo,
        datetime: globalInfo.datetime,
        file: imageUploads[pictureIndex],
        tags: ALL_TAGS_TO_FALSE
      })
    }
    setPerPictureInfo(perPictureInfoBuilder)
    setIsReady(true)
  }

  const pictureIsValid = (pictureIndex: number): boolean => {
    for (const tag of Object.keys(perPictureInfo[pictureIndex].tags)) {
      if (perPictureInfo[pictureIndex].tags[tag as AllTags]) {
        return true
      }
    }
    return false
  }

  useEffect(buildInitialPerPictureInforFromGlobalInfo, [])

  const updateValidity = (): void => {
    let _picturesLeftToTagCount = 0
    let firstInvalidPicture = null
    for (let pictureIndex = 0; pictureIndex < perPictureInfo.length; pictureIndex++) {
      if (!pictureIsValid(pictureIndex)) {
        _picturesLeftToTagCount++
        if (firstInvalidPicture === null) firstInvalidPicture = pictureIndex
      }
    }
    setPicturesLeftToTagCount(_picturesLeftToTagCount)
    setFirstInvalidPictureIndex(firstInvalidPicture)
  }

  useEffect(updateValidity, [perPictureInfo])

  const triggerCurrentPictureDeleteAnimation = (): void => {
    setCurrentPictureDeleting(true)
  }

  const onCurrentPictureDeleteAnimationComplete = (): void => {
    setCurrentPictureDeleting(false)

    const editedPerPictureInfo = perPictureInfo
    editedPerPictureInfo.splice(currentPictureIndex, 1)
    setCurrentPictureIndex(Math.max(0, currentPictureIndex - 1))
    setPerPictureInfo(editedPerPictureInfo)
  }

  const selectFirstInvalidPicture = (): void => {
    if (firstInvalidPictureIndex === null) return
    setCurrentPictureIndex(firstInvalidPictureIndex)
  }

  const onButtonClick = async (): Promise<void> => {
    await onSubmit(perPictureInfo)
  }

  if (!isReady) return <></>
  return (
    <div className="contentContainer" id="perPictureInfo">
      <PictureSelector
        pictures={perPictureInfo}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        deleteCurrentPicture={triggerCurrentPictureDeleteAnimation}
        nextPictureSelectable={pictureIsValid(currentPictureIndex)}
        currentPictureDeleting={currentPictureDeleting}
        onCurrentPictureDeleted={onCurrentPictureDeleteAnimationComplete}
      />
      <div className="pillsContainer">
        <Pill text={formatDate(perPictureInfo[currentPictureIndex].datetime)} onClick={onPillClick} icon={faPencil}/>
        <Pill text={formatTime(perPictureInfo[currentPictureIndex].datetime)} onClick={onPillClick} icon={faPencil}/>
        <Pill text={perPictureInfo[currentPictureIndex].departement} onClick={onPillClick} icon={faPencil}/>
      </div>
      <h3>Quels éléments apparaissent ?</h3>
      <p>Sélectionnez les éléments que vous voyez</p>
      <Tags tagEnabled={perPictureInfo[currentPictureIndex].tags} setTagEnabled={setTagEnabled}/>
      {picturesLeftToTagCount !== null && picturesLeftToTagCount !== 0 && <p className='error'>Il reste {picturesLeftToTagCount} {picturesLeftToTagCount === 1 ? 'photo' : 'photos' } à décrire. <span className='clickable' onClick={selectFirstInvalidPicture}>Voir</span></p>}
      <Button text='Envoyer' filled={isMobile} disabled={picturesLeftToTagCount !== 0} onClick={onButtonClick}/>
    </div>
  )
}
