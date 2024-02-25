import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDatePicker from 'react-datepicker'

export interface DatePickerHandle {
  collect: () => Date
}

export const DateTimePicker = ({ dateTime, onChange }: { dateTime: Date | null, onChange: (dateTime: Date) => void }): JSX.Element => {
  const [dateId, timeId] = ['date-picker', 'time-picker']

  const now = new Date()
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateMidnight = dateTime === null ? null : new Date(dateTime.getFullYear(), dateTime?.getMonth(), dateTime.getDate())

  const isDateValid = dateTime !== null && dateMidnight!.getTime() <= todayMidnight.getTime()
  const isTimeValid = dateTime !== null && (dateMidnight!.getTime() < todayMidnight.getTime() || dateTime.getTime() <= now.getTime())

  return (
    <>
      <div className='field-container'>
        <label htmlFor={dateId}>Date</label>
        <div className='input-container'>
          <ReactDatePicker dateFormat="dd/MM/yyyy" selected={dateTime} onChange={onChange} className={`input ${isDateValid ? 'valid' : 'invalid'}`} id={dateId}/>
          <FontAwesomeIcon icon={faCalendarDays} className="input-icon"/>
        </div>
      </div>
      <div className='field-container'>
        <label htmlFor={timeId}>Heure</label>
        <div className='input-container'>
          <ReactDatePicker showTimeSelect dateFormat="HH:mm" showTimeSelectOnly selected={dateTime} onChange={onChange} className={`input ${isTimeValid ? 'valid' : 'invalid'}`} id={timeId} timeFormat="HH:mm" />
          <FontAwesomeIcon icon={faClock} className="input-icon"/>
        </div>
      </div>
    </>
  )
}
