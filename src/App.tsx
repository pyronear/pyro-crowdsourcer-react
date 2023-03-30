import './App.scss'
import { useEffect, useRef, useState } from 'react'
import { Modal, ModalRef } from './modals/Modal'
import { GlobalInfo, GlobalInfoData } from './pages/global-info/GlobalInfo'
import { Intro } from './pages/landing/Intro'
import { Send } from './pages/landing/Send'
import { PerPictureInfo } from './pages/per-picture-info/PerPictureInfo'
import Navbar from './global-components/navbar/Navbar'
import { Carousels } from './global-components/carousel/Carousels'

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

  const [stage, setStage] = useState<'IMAGE_UPLOAD' | 'GLOBAL_INFO' | 'PER_PICTURE_INFO' | 'CONFIRM'>('IMAGE_UPLOAD')

  const [globalInfo, setGlobalInfo] = useState<GlobalInfoData | null>(
    { consent: true, datetime: new Date(), departement: 'Aine' }
  )

  const [imageUploads, setImageUploads] = useState<File[]>([])

  let content: JSX.Element = <></>
  const onImageUploadSubmit = (files: File[]): void => {
    setImageUploads(files)
    setStage('GLOBAL_INFO')
  }

  const onGlobalInfoSubmit = (globalInfoOutput: GlobalInfoData): void => {
    setGlobalInfo(globalInfoOutput)
    setStage('PER_PICTURE_INFO')
  }

  switch (stage) {
    case 'IMAGE_UPLOAD':
      content = (
        <>
          <Intro isMobile={isMobile}/>
          <Send isMobile={isMobile} onSubmit={onImageUploadSubmit}/>
        </>
      )
      break

    case 'GLOBAL_INFO':
      content = (
        <>
          <GlobalInfo onSubmit={onGlobalInfoSubmit}/>
        </>
      )
      break
    case 'PER_PICTURE_INFO':
      if (globalInfo === null) {
        throw TypeError('globalInfo is null')
      }
      content = (
        <>
          {
            modalRef.current === null
              ? <></>
              : <PerPictureInfo imageUploads={imageUploads} globalInfo={globalInfo} modalRef={modalRef.current} isMobile={isMobile}/>
          }
        </>
      )
      break
    default:
      break
  }

  return (
      <div id="rootOrganizer" className={`${isModalOpen ? 'modalOpen' : ''}`}>
        <Modal ref={modalRef} handleChange={handleModalChange}/>
        <Navbar isMobile={isMobile} modalRef={modalRef.current}/>
        {stage !== 'PER_PICTURE_INFO' && <Carousels isMobile={isMobile} animate={animate}/>}
        <div id="pageContainer" className={`${isMobile ? 'mobile' : ''}${stage === 'PER_PICTURE_INFO' ? ' noPadding' : ''}`}>
          {content}
        </div>
      </div>
  )
}

export default App
