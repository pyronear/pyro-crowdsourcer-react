import './App.scss'
import { useEffect, useRef, useState } from 'react'
import { Modal, ModalRef } from './modals/Modal'
import { GlobalInfo, GlobalInfoData, globalInfoPath } from './pages/global-info/GlobalInfo'
import { Intro } from './pages/landing/Intro'
import { Send } from './pages/landing/Send'
import { PerPictureInfo, PictureInfo, perPictureInfoPath } from './pages/per-picture-info/PerPictureInfo'
import Navbar from './global-components/navbar/Navbar'
import { Carousels } from './global-components/carousel/Carousels'
import { StorageService } from './services/storage/storage.service'
import { AllTags } from './pages/per-picture-info/tags/resources/tags'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom'
import { Confirm, confirmPath } from './pages/confirm/Confirm'

const MOBILE_PX_THRESHOLD = 650

const vis = (() => {
  const keysList = ['hidden', 'webkitHidden', 'mozHidden', 'msHidden'] as const
  const valueList = ['visibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange', 'msvisibilitychange'] as const
  type Keys = typeof keysList[number]
  type Value = typeof valueList[number]

  let stateKey: Keys
  let eventKey: Value

  const keys = {
    hidden: 'visibilitychange',
    webkitHidden: 'webkitvisibilitychange',
    mozHidden: 'mozvisibilitychange',
    msHidden: 'msvisibilitychange'
  }
  for (stateKey in keys) {
    if (stateKey in document) {
      eventKey = keys[stateKey] as Value
      break
    }
  }
  return function (c?: () => void) {
    if (c != null) document.addEventListener(eventKey, c)
    return !((document as any)[stateKey] as boolean)
  }
})()

function App (): JSX.Element {
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [animate, setAnimate] = useState(true)
  const history = useHistory()
  const location = useLocation()

  const onWindowResize = (): void => {
    if (window.innerWidth < MOBILE_PX_THRESHOLD) {
      setIsMobile(true)
      return
    }
    setIsMobile(false)
  }

  const modalRef = useRef<ModalRef>(null)

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    onWindowResize()

    vis(function () {
      if (vis()) {
        setTimeout(function () {
          setAnimate(true)
        }, 300)
      } else {
        setAnimate(false)
      }
    })
  }, [])

  const handleModalChange = (modalState: boolean): void => setIsModalOpen(modalState)

  const [imageUploads, setImageUploads] = useState<File[]>([])
  const [globalInfo, setGlobalInfo] = useState<GlobalInfoData | null>(
    { consent: true, datetime: new Date(), department: 'Aine' }
  )
  const [, setPicturesInfo] = useState<PictureInfo[]>([])

  const content: JSX.Element = <></>
  const onImageUploadSubmit = (files: File[]): void => {
    setImageUploads(files)
    history.push(globalInfoPath)
  }

  const onGlobalInfoSubmit = (globalInfoOutput: GlobalInfoData): void => {
    setGlobalInfo(globalInfoOutput)
    history.push(perPictureInfoPath)
  }

  const onPerPictureInfoSubmit = async (picturesInfo: PictureInfo[]): Promise<void> => {
    setPicturesInfo(picturesInfo)
    const storage = new StorageService()
    await Promise.all(picturesInfo.map(async (pictureInfo, index): Promise<void> => {
      await storage.uploadMediaWithAnnotations(pictureInfo.file, Object.keys(pictureInfo.tags).filter((tag) => pictureInfo.tags[tag as AllTags]))
    }))
    history.push(confirmPath)
  }

  const isPerPictureInfo = location.pathname === perPictureInfoPath

  const routes = <>
    <Route exact path="/" >
      <Intro isMobile={isMobile} />
      <Send isMobile={isMobile} onSubmit={onImageUploadSubmit} />
    </Route>
    <Route exact path={globalInfoPath} >
      {imageUploads.length === 0 ? <Redirect to='/' /> : <GlobalInfo imageUploads={imageUploads} onSubmit={onGlobalInfoSubmit} />}
    </Route>
    <Route exact path={perPictureInfoPath} >
      {(() => {
        if (imageUploads.length === 0) return <Redirect to="/" />
        if (globalInfo === null) return <Redirect to={globalInfoPath} />
        if (modalRef.current === null) return <></>
        return <PerPictureInfo onSubmit={onPerPictureInfoSubmit} imageUploads={imageUploads} globalInfo={globalInfo} modalRef={modalRef.current} isMobile={isMobile} />
      })()
      }
    </Route>
    <Route exact path={confirmPath} >
      <Confirm />
    </Route>
  </>

  return (
    <div id="rootOrganizer" className={`${isModalOpen ? 'modalOpen' : ''}`}>
      <Modal ref={modalRef} handleChange={handleModalChange} />
      <Navbar isMobile={isMobile} modalRef={modalRef.current} />
      {!isPerPictureInfo && <Carousels isMobile={isMobile} animate={animate} />}
      <div id="pageContainer" className={`${isMobile ? 'mobile' : ''}${isPerPictureInfo ? ' noPadding' : ''}`}>
        {content}
        {routes}
      </div>
    </div>
  )
}

export default App
