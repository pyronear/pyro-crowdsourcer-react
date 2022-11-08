
import yes from '../pictures/yes.jpg'
import no from '../pictures/no.jpg'

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Hint = () =>
  <div id="uploadHint" className='formBox' >
    <p>Idéalement partagez-nous une photo depuis une vue assez dégagée sur une zone forestière, avec et/ou sans flamme/ fumées.</p>
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
