import { Button } from '../../generic-components/button/Button'
import './Intro.scss'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export const Intro = ({ isMobile }: { isMobile: boolean }): JSX.Element => {
  return (
    <div id="introContainer" className={isMobile ? 'mobile' : ''}>

      <div id="introText" className={isMobile ? 'mobile' : ''}>
        <h1>Participez à la protection des forêts</h1>
        <div id="explain">
          <h2>🤝 Comment aider ?</h2>
          <p id="explainSubtitle">{'En partageant une photo, vous participez à la création d\'un jeu de données public qui permet d\'aider à la détection de feux de forêts.'}</p>
        </div>
        <a id="detection">En savoir plus sur notre système de détection</a>
        {isMobile ? <></> : <Button text={'Envoyer une photo'} icon={faArrowDown} className='sendButton'/>}
      </div>
    </div>
  )
}
