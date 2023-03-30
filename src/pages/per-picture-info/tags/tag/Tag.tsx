import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tag.scss'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { AllTags, TagInfo } from '../resources/tags'

// todo: remove tagId
export const Tag = ({
  tagInfo,
  enabled,
  onClick,
  tagId
}: {
  tagInfo: TagInfo
  enabled: boolean
  onClick: ((key: AllTags) => void) | (() => void)
  tagId: AllTags
}): JSX.Element => {
  return (
    <div className={`tagContainer ${enabled ? 'enabled' : 'disabled'}`} onClick={() => onClick(tagId)}>
      <div className='tag'>
        <img src={tagInfo.image}/>
      </div>
      <span>{enabled ? <FontAwesomeIcon icon={faCircleCheck} className='enabledIcon'/> : <></> }{tagInfo.title}</span>
    </div>
  )
}
