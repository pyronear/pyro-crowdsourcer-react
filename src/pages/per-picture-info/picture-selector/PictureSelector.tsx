import { PictureInfo } from '../PerPictureInfo'
import './PictureSelector.scss'
import { Picture } from './picture/Picture'

export const PictureSelector = ({
  pictures,
  currentPictureIndex,
  setCurrentPictureIndex,
  deleteCurrentPicture,
  currentPictureDeleting,
  onCurrentPictureDeleted,
  nextPictureSelectable
}: {
  pictures: PictureInfo[]
  currentPictureIndex: number
  setCurrentPictureIndex: (number: number) => void
  deleteCurrentPicture: () => void
  currentPictureDeleting: boolean
  onCurrentPictureDeleted: () => void
  nextPictureSelectable: boolean
}): JSX.Element => {
  const pictureWidth = '60vw'
  const margin = '10px'

  const selectNextPicture = (): void => {
    if (!pictureIsSelectable(currentPictureIndex + 1)) return
    setCurrentPictureIndex(Math.min(pictures.length - 1, currentPictureIndex + 1))
  }

  const selectPreviousPicture = (): void => {
    setCurrentPictureIndex(Math.max(0, currentPictureIndex - 1))
  }

  const onPictureClick = (pictureIndex: number): void => {
    if (pictureIndex === currentPictureIndex + 1) {
      selectNextPicture()
    } else if (pictureIndex === currentPictureIndex - 1) {
      selectPreviousPicture()
    }
  }

  const onPictureSwipe = (pictureIndex: number, pictureSwipePx: number): void => {
    if (pictureIndex !== currentPictureIndex) return
    if (Math.abs(pictureSwipePx) < 50) return
    if (pictureSwipePx > 0) selectPreviousPicture()
    if (pictureSwipePx < 0) selectNextPicture()
  }

  const pictureIsSelectable = (pictureIndex: number): boolean => {
    if ((pictureIndex <= currentPictureIndex)) {
      return true
    } else if ((pictureIndex === currentPictureIndex + 1) && nextPictureSelectable) {
      return true
    }
    return false
  }

  return (
    <div id='picture-by-picture' style={{
      transform: `translateX(calc(-${currentPictureIndex} * (${pictureWidth} + 2 * ${margin})))`
    }}>
      {
        pictures.map((picture, pictureIndex) => {
          return <Picture
          key={pictureIndex}
          className={pictureIndex === currentPictureIndex ? 'selected' : ''}
          picture={picture.file}
          clickable={pictureIsSelectable(pictureIndex)}
          deletable={pictureIndex === currentPictureIndex && pictures.length > 1}
          onClick={() => onPictureClick(pictureIndex)}
          onSwipe={(pictureSwipePx: number) => onPictureSwipe(pictureIndex, pictureSwipePx)}
          onDelete={deleteCurrentPicture}
          deleting={currentPictureIndex === pictureIndex ? currentPictureDeleting : false } // todo: find out why this is needed
          onDeleteComplete={onCurrentPictureDeleted}
          />
        })
      }
    </div>
  )
}
