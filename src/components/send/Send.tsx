import './Send.scss';
import Upload from './upload/Upload';
import { Form } from './form/form';
import { Hint } from './hint/hint';
import { Footer } from './footer/footer'

export const Send = ({isMobile}: {isMobile: boolean}) => {
  return (
      <div id="sendContainer" className={isMobile? 'mobile': ''}>
        <h2>📷 Envoyer ma photo</h2>
        <p>Télécharger une ou plusieurs photo</p>
          <div id="formContainer">
            <Upload/>
            <Hint/>
            <Form/>
        </div>
        <Footer/>
      </div>
  )
}
