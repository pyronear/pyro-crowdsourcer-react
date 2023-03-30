import './Button.scss'
import {
  IconDefinition
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = ({
  text,
  icon = null,
  disabled = false,
  secondary = false,
  filled = false, // Useful for mobile where buttons cannot be hovered
  className,
  onClick = () => {}
}: {
  text: string
  icon?: IconDefinition | null
  disabled?: boolean
  secondary?: boolean
  filled?: boolean
  className?: string
  onClick?: () => any
}): JSX.Element => {
  return (
    <button
      className={`pyro-button${secondary ? ' secondary' : ''}${filled ? ' filled' : ''}${className !== undefined ? ' ' + className : ''}`}
      disabled={disabled}
      onClick={onClick}>
      {text}
      {icon !== null ? <FontAwesomeIcon icon={icon}/> : <></>}
    </button>
  )
}
