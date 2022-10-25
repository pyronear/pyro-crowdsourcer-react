import React from 'react'
import './Button.css'
import {
  IconDefinition,
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button({
  text,
  icon=null,
  disabled=false,
  secondary=false,
}: {
  text: string,
  icon?: IconDefinition | null,
  disabled?: boolean,
  secondary?: boolean,
}) {
  return (
    <button className={`pyro-button ${secondary? 'secondary': ''}`} disabled={disabled}>
      {text}
      {icon !== null ? <FontAwesomeIcon icon={icon}/> : <></>}
    </button>
  )
}

