import { useEffect, useState } from 'react'
import './Picture.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const DELAY_SECONDS = 0.1

export const Picture = ({
  className,
  picture,
  clickable,
  deletable,
  deleting,
  onClick,
  onSwipe,
  onDelete,
  onDeleteComplete
}: {
  className: string
  picture: File
  clickable: boolean
  deletable: boolean
  deleting: boolean
  onClick: () => void
  onSwipe: (swipePx: number) => void
  onDelete: () => void
  onDeleteComplete: () => void
}): JSX.Element => {
  const [pictureSrc, setPictureSrc] = useState<string | null>(null)
  const [touchStartPos, setTouchStartPos] = useState<number | null>(null)
  const [touchCurrentPos, setTouchCurrentPos] = useState<number | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPictureSrc(reader.result as string)
    }
    reader.readAsDataURL(picture)
  }, [picture])

  useEffect(() => {
    if (!deleting) return
    setTimeout(() => onDeleteComplete(), DELAY_SECONDS * 1000)
  }, [deleting])

  const onTouchStart = (e: React.TouchEvent<HTMLImageElement>): void => {
    setTouchStartPos(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
    setTouchCurrentPos(e.targetTouches[0].clientX)
  }
  const onTouchEnd = (_e: React.TouchEvent<HTMLImageElement>): void => {
    onSwipe((touchCurrentPos === null ? 0 : touchCurrentPos) - (touchStartPos === null ? 0 : touchStartPos))
  }

  return (
    (pictureSrc !== null
      ? <div className='picture-preview'>
      <img src={pictureSrc}
        className={`${className} ${clickable ? 'clickable' : ''} ${deleting ? 'deleting' : ''}`}
        onClick={() => { onClick() }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transition: `width: ${DELAY_SECONDS}s, margin: ${DELAY_SECONDS}s, opacity: ${DELAY_SECONDS}s` }}
        />
      {deletable && <div className='deleteIconContainer'><FontAwesomeIcon icon={faTrashCan} className='deleteIcon' onClick={() => onDelete()}/></div>}
      </div>
      : <></>)
  )
}
