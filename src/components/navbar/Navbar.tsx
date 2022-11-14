import './Navbar.scss'

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const logoUrl = 'https://pyronear.org/img/logo_letters.png'

export default function Navbar ({ isMobile }: { isMobile: boolean }): JSX.Element {
  return (
    <>
      <nav className={isMobile ? 'mobile' : ''}>
        <img id="logo" src={logoUrl} alt="" />
        {
          isMobile
            ? <a id="about" className='mobile' href="https://pyronear.org/"><FontAwesomeIcon icon={faCircleInfo}/></a>
            : <a id="about" href="https://pyronear.org/">À propos de Pyronear</a>
        }
      </nav>
      <div className={isMobile ? 'mobile' : ''} id="headerBg"></div>
    </>
  )
}
