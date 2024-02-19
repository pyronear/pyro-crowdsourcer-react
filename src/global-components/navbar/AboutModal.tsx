import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalInnerComponent } from '../../modals/Modal'

export const AboutModal: ModalInnerComponent = ({
  close
}: {
  close: () => void
}): JSX.Element => {
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="closeIcon"
        onClick={close}
      />

      <h3>A propos de pyronear</h3>
      <p>
        Pyronear est une association à but non lucratif loi 1901 dont l’objectif
        est de démocratiser des solutions technologiques sobres et ouvertes de
        lutte contre les incendies de forêts, au service des écosystèmes et des
        citoyens. Pour cela, nous co-construisons une solution open source de
        détection détection précoce, performante, automatique, énergiquement
        sobre, économique et modulable des départs de feux dans les espaces
        naturels.
      </p>

      <p>
        Pour en savoir plus, rendez-vous sur{' '}
        <a href="https://pyronear.org/">https://pyronear.org/</a>
      </p>
    </>
  )
}
