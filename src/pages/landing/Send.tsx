import './Send.scss'
import { useRef } from 'react'
import MobileUpload from './mobile-upload/MobileUpload'
import { Hint } from './hint/hint'
import Upload from './upload/Upload'
import { Footer } from '../../global-components/footer/footer'

export const Send = ({ isMobile, onSubmit }: { isMobile: boolean, onSubmit: (files: File[]) => void }): JSX.Element => {
  const datePickerRef = useRef()
  const onImageUpload = (fileList: FileList): void => {
    const files: File[] = []
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i])
    }
    onSubmit(files)
  }

  const onPictureSubmit = (file: File): void => {
    if (datePickerRef.current === undefined) {
      return
    }
    (datePickerRef.current as { updateDate: (lastModified: number) => any }).updateDate(file.lastModified)
  }

  if (isMobile) {
    return (
      <div id="mobileSendContainer" className="mobile">
        <MobileUpload onImageUpload={onImageUpload}/>
        <Hint isMobile/>
      </div>
    )
  }
  return (
    <div id="sendContainer" className={isMobile ? 'mobile' : ''}>
      <h2>📷 Envoyer ma photo</h2>
      <p>Télécharger une ou plusieurs photo</p>
        <div id="formContainer">
          <Upload onPictureSubmit={onPictureSubmit}/>
          <Hint isMobile/>
      </div>
      <Footer/>
    </div>
  )
}
