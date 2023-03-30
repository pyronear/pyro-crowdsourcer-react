import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalInnerComponent } from '../../modals/Modal'

export const AboutModal: ModalInnerComponent = ({ close }: { close: () => void }): JSX.Element => {
  return (
    <>
      <FontAwesomeIcon icon={faCircleXmark} className='closeIcon' onClick={close}/>

      <h3>A propos de pyronear</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, neque eget interdum sagittis, diam orci dapibus erat, id luctus nisl enim a ante. Ut finibus ipsum sit amet diam consectetur, eget sollicitudin dui egestas. Proin non velit non sem auctor maximus. Morbi sit amet placerat odio, quis sodales odio. Mauris euismod leo in tristique elementum. Curabitur at lorem quis justo sollicitudin vehicula sed eget magna. Nam ac ornare leo. Integer quis tincidunt quam. Praesent dapibus sem at justo laoreet, vitae dictum libero placerat. Pellentesque vitae nunc lorem. Integer at nunc mi. Ut accumsan arcu et enim consectetur, vel pharetra arcu tincidunt. Aenean quis magna at arcu tincidunt ultricies non et ante. Donec vel fermentum quam, in blandit metus. In hac habitasse platea dictumst. Aliquam eleifend sagittis euismod. Nulla commodo aliquet purus nec sollicitudin. Aliquam et volutpat augue. Donec pretium ornare ultrices. Etiam sit amet bibendum orci. Praesent luctus posuere velit. Curabitur iaculis velit sed sapien blandit, vitae fringilla ligula porta. Sed sed cons
      </p>
    </>
  )
}
