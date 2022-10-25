import Button from '../button/Button';
import './Intro.css';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function Intro() {
  return (
    <div id="introContainer">
      <h1>Participez à la protection des forêts</h1>
      <div id="explain">
        <h2>🤝 Comment aider ?</h2>
        <p id="explainSubtitle">En partageant une photo, vous participez à la création d'un jeu de données public qui permet d'aider à la détection de feux de forêts.</p>
      </div>
      <a id="detection" href="detect">En savoir plus sur notre système de détection</a>
      <Button text={"Envoyer une photo"} icon={faArrowDown}/>
    </div>
  )
}
