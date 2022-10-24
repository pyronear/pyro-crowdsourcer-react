import React from 'react'
import './Intro.css';

export default function Intro() {
  return (
    <div id="container">
      <h1>Participez à la protection des forêts</h1>
      <div id="explain">
        <h2>🤝 Comment aider ?</h2>
        <p id="explainSubtitle">En partageant une photo, vous participez à la création d'un jeu de données public qui permet d'aider à la détection de feux de forêts.</p>
      </div>
      <a id="detection" href="detect">En savoir plus sur notre système de détection</a>
    </div>
  )
}
