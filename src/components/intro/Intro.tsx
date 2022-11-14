import { Button } from '../button/Button'
import './Intro.scss'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Carousel from './carousel/Carousel'

export const Intro = ({ isMobile }: { isMobile: boolean }): JSX.Element => {
  return (
    <div id="introContainer" className={isMobile ? 'mobile' : ''}>
      <div id="straightCarouselContainer" className={isMobile ? 'mobile' : ''}>
        {isMobile
          ? <div id="smallCarouselContainer">
          <Carousel/>
          <Carousel directionLeftToRight={false}/>
        </div>
          : <div id="wideCarouselContainer">
          <Carousel />
          <Carousel directionLeftToRight={false}/>
          <Carousel/>
        </div>
        }
      </div>
      <div id="introText" className={isMobile ? 'mobile' : ''}>
        <h1>Participez à la protection des forêts</h1>
        <div id="explain">
          <h2>🤝 Comment aider ?</h2>
          <p id="explainSubtitle">{'En partageant une photo, vous participez à la création d\'un jeu de données public qui permet d\'aider à la détection de feux de forêts.'}</p>
        </div>
        <a id="detection" href="detect">En savoir plus sur notre système de détection</a>
        <Button text={'Envoyer une photo'} icon={faArrowDown}/>
      </div>
    </div>
  )
}
