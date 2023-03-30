import './Navbar.scss'

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalRef } from '../../modals/Modal'
import { AboutModal } from './AboutModal'

const logoUrl = 'https://pyronear.org/img/logo_letters.png'

export default function Navbar ({ isMobile, modalRef }: { isMobile: boolean, modalRef: ModalRef | null }): JSX.Element {
  const onAboutClick = (): void => {
    modalRef?.open(AboutModal, {})
  }
  return (
    <>
      <nav className={isMobile ? 'mobile' : ''}>
        <img id="logo" src={logoUrl} alt="" />
        {
          isMobile
            ? <a id="about" className='mobile'><FontAwesomeIcon icon={faCircleInfo} onClick={onAboutClick}/></a>
            : <a id="about" onClick={onAboutClick}>À propos de Pyronear</a>
        }
      </nav>
      <div className={isMobile ? 'mobile' : ''} id="headerBg"></div>
    </>
  )
}
