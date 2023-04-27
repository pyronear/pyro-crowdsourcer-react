import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tag.scss'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { TagInfo } from '../resources/tags'

export const Tag = ({
  tagInfo,
  enabled,
  onClick
}: {
  tagInfo: TagInfo
  enabled: boolean
  onClick: (() => void) | (() => void)
}): JSX.Element => {
  return (
    <div className={`tagContainer ${enabled ? 'enabled' : 'disabled'}`} onClick={() => onClick()}>
      <div className='tag'>
        <img src={tagInfo.image}/>
      </div>
      <span>{enabled ? <FontAwesomeIcon icon={faCircleCheck} className='enabledIcon'/> : <></> }{tagInfo.title}</span>
    </div>
  )
}
