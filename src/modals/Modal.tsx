import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './Modal.scss'

export type ModalContext = any
export type ModalInnerComponent = React.FC<{ close: () => void, context: ModalContext }>
export interface ModalRef {
  open: (content: ModalInnerComponent, context: ModalContext) => void
  close: () => unknown
  isOpen: () => boolean
}

interface Props { handleChange: (modalState: boolean) => void }

const ANIMATION_DURATION_SECONDS = 0.3
export const Modal = forwardRef<ModalRef, Props>(({ handleChange }, ref: any): JSX.Element => {
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [_isOpen, setIsOpen] = useState<boolean>(false)
  const [InnerComponent, setInnerComponent] = useState<ModalInnerComponent | null>(null)
  const [context, setContext] = useState<ModalContext>(null)

  const close = (): void => {
    handleChange(false)
    setIsClosing(true)
    setTimeout(() => setIsOpen(false), ANIMATION_DURATION_SECONDS * 1000)
  }

  const open = (content: ModalInnerComponent, context: ModalContext): void => {
    handleChange(true)
    setIsClosing(true)
    if (content === null) {
      throw new Error('content cant be null')
    }
    setInnerComponent(() => content) // Why is this required ?
    setContext(context)
    setIsOpen(true)
  }

  useImperativeHandle(ref, (): ModalRef => ({
    open,
    close,
    isOpen () { return _isOpen }
  }))

  useEffect(() => {
    if (!_isOpen) return
    setIsClosing(false)
  }, [_isOpen])

  return (
    <>
     {_isOpen && InnerComponent !== null &&
      <div id="modalContainer" className={isClosing ? 'isClosing' : ''} style={{ transition: `opacity ${ANIMATION_DURATION_SECONDS}s` }} onClick={close}>
        <div id="modal" onClick={(e) => e.stopPropagation()}>
          <InnerComponent close={close} context={context}/>
        </div>
      </div> }
    </>
  )
})
Modal.displayName = 'Modal'
