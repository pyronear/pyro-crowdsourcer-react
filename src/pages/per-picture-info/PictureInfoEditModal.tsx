import { useState } from 'react'
import { Button } from '../../generic-components/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalInnerComponent } from '../../modals/Modal'
import { GlobalInfoForm, GlobalInfoData } from '../global-info/GlobalInfo'
import { PictureInfo } from './PerPictureInfo'
import { isDateAndTimeBeforeNow } from '../../helpers/date'

export type PictureInfoEditModalContext = PictureInfo & {
  patchInfo: (info: GlobalInfoData) => void
}

export const PictureInfoEditModal: ModalInnerComponent = ({ close, context }: { close: () => void, context: PictureInfoEditModalContext }): JSX.Element => {
  const [date, setDate] = useState<Date>(context.datetime)
  const [department, setDepartment] = useState<string | null>(context.department)
  const submit = (): void => {
    context.patchInfo({ datetime: date, department: department!, consent: true })
    close()
  }

  const dateValidity = isDateAndTimeBeforeNow(date)

  const isValid = dateValidity.date && dateValidity.time

  return (<>
    <FontAwesomeIcon icon={faCircleXmark} className='closeIcon' onClick={close}/>
    <GlobalInfoForm date={date} onDateTimeChange={setDate} onDepartmentChange={setDepartment} initialDepartment={context.department} dateValidity={dateValidity} />
    <Button text='Valider' disabled={!isValid} onClick={submit}/>
  </>)
}
