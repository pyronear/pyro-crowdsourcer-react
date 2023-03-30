import { useState } from 'react'
import { Button } from '../../generic-components/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalInnerComponent } from '../../modals/Modal'
import { GlobalInfoForm, GlobalInfoData } from '../global-info/GlobalInfo'
import { PictureInfo } from './PerPictureInfo'
import { Value } from '../../generic-components/select/Select'

export type PictureInfoEditModalContext = PictureInfo & {
  patchInfo: (info: GlobalInfoData) => void
}

export const PictureInfoEditModal: ModalInnerComponent = ({ close, context }: { close: () => void, context: PictureInfoEditModalContext }): JSX.Element => {
  const [date, setDate] = useState<Date>(context.datetime)
  const [departement, setDepartement] = useState<Value>(context.departement)
  const submit = (): void => {
    context.patchInfo({ datetime: date, departement: departement as string, consent: true })
    close()
  }
  // todo : fix validity
  return (<>
    <FontAwesomeIcon icon={faCircleXmark} className='closeIcon' onClick={close}/>
    <GlobalInfoForm date={date} onDateTimeChange={setDate} onDepartementChange={(d) => setDepartement(d as string)} valid={{ date: true, time: true }} initialDepartement={context.departement}/>
    <Button text='Valider' onClick={submit}/>
  </>)
}
