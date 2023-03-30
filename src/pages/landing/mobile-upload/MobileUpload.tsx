import { useRef } from 'react'
import './MobileUpload.scss'
import { Button } from '../../../generic-components/button/Button'

const MobileUpload = ({ onImageUpload }: { onImageUpload: (files: FileList) => any }): JSX.Element => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  return (
    <div id="uploadButtonContainer">
      <Button text="Envoyer une photo" filled onClick={() => inputRef.current?.click()}/>
      <input id="hiddenInput" type="file" onChange={(e: any) => onImageUpload(e.target.files)} ref={inputRef} multiple/>
    </div>
  )
}

export default MobileUpload
