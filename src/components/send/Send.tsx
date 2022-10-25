import React from 'react'
import './Send.css';
import Upload from './upload/Upload';

export const Send = () => {
  return (
    <div id="sendContainer">
      <h2>📷 Envoyer ma photo</h2>
      <p>Télécharger une ou plusieurs photo</p>
      <Upload/>
    </div>
  )
}
