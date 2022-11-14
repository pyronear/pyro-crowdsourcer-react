import { ChangeEvent, Component, createRef, DragEvent, MouseEvent } from 'react'
import './Upload.scss'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  onPictureSubmit: (file: File) => any
}
interface IState {
  imagePreviewUrl: string,
  file: File | null,
  draggedOver: boolean,
  error: string| null
}

export default class Upload extends Component<IProps, IState> {
  inputFileRef: React.RefObject<HTMLInputElement>

  constructor(props: IProps) {
    super(props);
    this.state = {
      file:  null,
      imagePreviewUrl: '',
      draggedOver: false,
      error: null,
    };
    this.inputFileRef = createRef();
  }

  _handleFakeUploadClick = (e: MouseEvent) => {
    e.preventDefault();
    this.inputFileRef.current?.click()
  }

  _handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.completeFileUpload(e.target.files)

  }

  _handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    this.setState({draggedOver: true})
  }

  _handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    this.setState({draggedOver: false})
  }
  _handleDrop = (e: DragEvent) => {
    this._handleDragEnd(e);
    this.completeFileUpload(e.dataTransfer.files)
  }

  setError(errorMessage: string) {
    this.setState({error: errorMessage})

  }

  completeFileUpload(files: FileList | null) {
    if (!files || files.length === 0) {
      this.setError("Ceci n'est pas un fichier.")
      return
    }
    const file = files[0];
    const splitWithDots = file.name.split(".")
    if (splitWithDots.length < 2) {
      this.setError("Le fichier n'a pas d'extension.")
      return
    }
    const fileExtension = splitWithDots[splitWithDots.length - 1];
    if (! ["jpg", "jpeg", "png"].includes(fileExtension)) {
      this.setError(`Les fichiers ${fileExtension} ne sont pas acceptés.`)
      return
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result as string,
        error: null
      });
    }
    this.props.onPictureSubmit(file)
    reader.readAsDataURL(file)
  }

  render() {
    const {imagePreviewUrl} = this.state;
    return (
        <div id="uploadContainer" onDragOver={this._handleDragOver} onDragLeave={this._handleDragEnd} onDrop={this._handleDrop} className={`${this.state.draggedOver? 'draggedOver': ''} formBox`}>
          <div id="promptContainer">
            <div className="icon-container">
              <FontAwesomeIcon icon={faCloudUpload}/>
            </div>
            <div className="text-container">
              <p className="instructions">Glisser/ déposer une photo ici -  <b>ou <span className="browse" onClick={this._handleFakeUploadClick}>parcourir</span></b></p>
              <p className="constraints">Maximum 200Mb - format acceptés : png, jpeg</p>
              {this.state.error? <p className="error" >{this.state.error}</p>: <></>}
            </div>
          </div>
          <input id="hiddenInput" ref={this.inputFileRef} type="file" onChange={this._handleImageChange} />
          {imagePreviewUrl ? <img id="previs" src={imagePreviewUrl} alt="previsualisation"/> : <></>}
        </div>
    )
  }
}