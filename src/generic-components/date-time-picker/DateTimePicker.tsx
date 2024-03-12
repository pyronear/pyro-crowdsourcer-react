import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDatePicker from 'react-datepicker'

export interface DatePickerHandle {
  collect: () => Date
}

export const DateTimePicker = ({ dateTime, onChange }: { dateTime: Date | null, onChange: ({ dateTime, valid }: { dateTime: Date, valid: boolean }) => void }): JSX.Element => {
  const [dateId, timeId] = ['date-picker', 'time-picker']

  const now = new Date()
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateMidnight = dateTime === null ? null : new Date(dateTime.getFullYear(), dateTime?.getMonth(), dateTime.getDate())

  const dateIsValid = (dateTime: Date | null): boolean => dateTime !== null && dateMidnight!.getTime() <= todayMidnight.getTime()
  const timeIsValid = (dateTime: Date | null): boolean => dateTime !== null && (dateMidnight!.getTime() < todayMidnight.getTime() || dateTime.getTime() <= now.getTime())

  const _onChange = (dateTime: Date): void => {
    onChange({ dateTime, valid: dateIsValid(dateTime) && timeIsValid(dateTime) })
  }

  return (
    <>
      <div className='field-container'>
        <label htmlFor={dateId}>Date</label>
        <div className='input-container'>
          <ReactDatePicker dateFormat="dd/MM/yyyy" selected={dateTime} onChange={_onChange} className={`input ${dateIsValid(dateTime) ? 'valid' : 'invalid'}`} id={dateId}/>
          <FontAwesomeIcon icon={faCalendarDays} className="input-icon"/>
        </div>
      </div>
      <div className='field-container'>
        <label htmlFor={timeId}>Heure</label>
        <div className='input-container'>
          <ReactDatePicker showTimeSelect dateFormat="HH:mm" showTimeSelectOnly selected={dateTime} onChange={_onChange} className={`input ${timeIsValid(dateTime) ? 'valid' : 'invalid'}`} id={timeId} timeFormat="HH:mm" />
          <FontAwesomeIcon icon={faClock} className="input-icon"/>
        </div>
      </div>
    </>
  )
}
