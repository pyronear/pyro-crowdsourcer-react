import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Pill.scss'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export const Pill = ({ text, onClick, icon }: { text: string, onClick: () => void, icon: IconDefinition | null }): JSX.Element => {
  return (
    <div className='pyro-pill' onClick={onClick}>
      <span className='pill-text'>{text}</span>
      {
        icon === null
          ? <></>
          : <FontAwesomeIcon icon={icon} className="pill-icon"/>
      }

    </div>
  )
}
