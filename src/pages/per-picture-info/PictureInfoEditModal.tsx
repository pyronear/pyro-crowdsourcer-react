import { useState } from 'react'
import { Button } from '../../generic-components/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalInnerComponent } from '../../modals/Modal'
import { GlobalInfoForm, GlobalInfoData } from '../global-info/GlobalInfo'
import { PictureInfo } from './PerPictureInfo'

export type PictureInfoEditModalContext = PictureInfo & {
  patchInfo: (info: GlobalInfoData) => void
}

export const PictureInfoEditModal: ModalInnerComponent = ({ close, context }: { close: () => void, context: PictureInfoEditModalContext }): JSX.Element => {
  const [date, setDate] = useState<Date>(context.datetime)
  const [department, setDepartment] = useState<string | null>(context.department)
  const submit = (): void => {
    context.patchInfo({ datetime: date, department: department as string, consent: true })
    close()
  }
  // todo : fix validity
  return (<>
    <FontAwesomeIcon icon={faCircleXmark} className='closeIcon' onClick={close}/>
    <GlobalInfoForm date={date} onDateTimeChange={setDate} onDepartmentChange={(d) => setDepartment(d as string)} initialDepartment={context.department}/>
    <Button text='Valider' onClick={submit}/>
  </>)
}
