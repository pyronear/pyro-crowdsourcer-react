
import yes from './yes.jpg'
import no from './no.jpg'

import { faCircleCheck, faCircleXmark, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Hint = ({ isMobile }: { isMobile: boolean }): JSX.Element =>
  <div id="uploadHint" className={`formBox${isMobile ? ' mobile' : ''}`} >
    <h2><FontAwesomeIcon icon={faLightbulb} id="bulb-icon"/>Quel type de photo envoyer ?</h2>
    <p>Idéalement, partagez-nous une photo depuis une vue assez dégagée sur une zone forestière, avec et/ou sans flamme/fumée.</p>
    <div id="uploadHintComparison">
      <div className='yes'>
        <img src={yes} alt="yes" />
        <FontAwesomeIcon icon={faCircleCheck} className="yes"/>
      </div>
      <div className='no'>
        <img src={no} alt="no" />
        <FontAwesomeIcon icon={faCircleXmark} className="no"/>
      </div>
    </div>
  </div>
