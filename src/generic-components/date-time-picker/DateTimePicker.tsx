import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDatePicker from 'react-datepicker'

export interface DatePickerHandle {
  collect: () => Date
}

export const DateTimePicker = ({ dateTime, onChange, valid }: { dateTime: Date, onChange: (dateTime: Date) => void, valid: { date: boolean, time: boolean } }): JSX.Element => {
  const [dateId, timeId] = ['date-picker', 'time-picker']

  return (
    <>
      <div className='field-container'>
        <label htmlFor={dateId}>Date</label>
        <div className='input-container'>
          <ReactDatePicker dateFormat="dd/MM/yyyy" selected={dateTime} onChange={onChange} className={`input ${valid.date ? 'valid' : 'invalid'}`} id={dateId}/>
          <FontAwesomeIcon icon={faCalendarDays} className="input-icon"/>
        </div>
      </div>
      <div className='field-container'>
        <label htmlFor={timeId}>Heure</label>
        <div className='input-container'>
          <ReactDatePicker showTimeSelect dateFormat="HH:mm" showTimeSelectOnly selected={dateTime} onChange={onChange} className={`input ${valid.time ? 'valid' : 'invalid'}`} id={timeId} timeFormat="HH:mm" />
          <FontAwesomeIcon icon={faClock} className="input-icon"/>
        </div>
      </div>
    </>
  )
}
