import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import "./Fields.css"
import "react-datepicker/dist/react-datepicker.min.css";



import { faCalendarDays, IconDefinition, faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DatePicker = ({id, label}: {id: string, label: string}) => {
  const [startDate, setStartDate] = useState(new Date());


  const onDateChange = (date: any,) => {
    if (date === null) return;
    setStartDate(date)
  }
  return (
    <div className='pyro-input-container'>
      <label htmlFor={id}>{label}</label>
      <div className='pyro-input-field-container' >
        <ReactDatePicker dateFormat="dd/MM/yyyy HH:mm" showTimeSelect timeFormat='HH:mm' selected={startDate} onChange={onDateChange} className="pyro-input" id={id}/>
        <FontAwesomeIcon icon={faCalendarDays} className="pyro-input-field-icon"/>
      </div>
    </div>
  )
}

type SelectItem = {displayName: string, value: string | number}

export const DropDown = ({
  id,
  label,
  icon,
  multiple = false,
  items = [],
  placeholder = "Select",
  filterPlacehoder = "Filter"
}: {
  id: string,
  label: string,
  icon: IconDefinition,
  multiple?: boolean,
  items: Array<SelectItem>,
  placeholder?: string,
  filterPlacehoder?: string
}) => {
  // Todo: Optimize this hot mess

  let debounceTimer: any;

  const [input, setInput] = useState<string>("")
  const [matchingItems, setMatchingItems] = useState<Array<SelectItem>>(items)
  const [open, setOpen] = useState<boolean>(false)
  const [arrowFocus, setArrowFocus] = useState<number|null>(null);
  const [valid, setValid] = useState<boolean|null>(null)

  const simplifyString = (input: string) => input.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    resetArrowFocus()
    setOpen(false)
  }


  const resetArrowFocus = () => setArrowFocus(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    const isArrowUp = (e.key === "ArrowUp")
    const isArrowDown = (e.key === "ArrowDown")
    const isEnter = (e.key === "Enter")

    if (!(isArrowDown || isArrowUp || isEnter)) return;
    e.preventDefault()
    if (isEnter) {
      resetArrowFocus()
      // checkInputValidity()
      setOpen(false)
    }

    let newArrowFocus = (arrowFocus === null ? -1: arrowFocus)

    if (isArrowUp) {
      newArrowFocus--
      if (newArrowFocus < 0) newArrowFocus = matchingItems.length - 1
    }
    if (isArrowDown) {
      newArrowFocus++
      if (newArrowFocus >= matchingItems.length) newArrowFocus = 0
    }
    setInput(matchingItems[newArrowFocus].displayName)
    setArrowFocus(newArrowFocus)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputText = e.target.value
    resetArrowFocus()
    setInput(inputText)

    debounce(() => {
      setMatchingItems(items.filter((item) => {
        return (simplifyString(item.displayName).includes(simplifyString(inputText)))
      }))
    // checkInputValidity()

    }, 250)
  }

  const handleOptionClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    resetArrowFocus()
    setInput((e.target as unknown as {innerText: string}).innerText)
  }

  const debounce = (func: () => any, timer: number) => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(func, timer)
  }

  const checkInputValidity = useCallback(() => {
    console.log(input, input.length)
    if (input.length === 0) {
      setValid(null);
      return;
    }
    setValid(
      items.map(({displayName}) => displayName).includes(input)
    )
  }, [items, input])

  useEffect(() => {checkInputValidity()})

  return (
    <div className="pyro-input-container">
      <label htmlFor={id}>{label}</label>
      <div className='pyro-input-field-container' >
        <input name={id} id={id} onInput={handleInput} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown} value={input} className={`pyro-input ${valid? "valid": ""} ${valid === false? "invalid": "" }`} placeholder={open? filterPlacehoder: placeholder}/>
        <ul className={`select ${open? 'open': 'closed'}`}>
          {matchingItems.map(({displayName, value}, index) =>
            <li key={value} value={value} onClick={handleOptionClick} className={`select-item ${arrowFocus === index? "arrowFocused": ""} ${multiple? "multiple": ""}`}>{displayName}</li>
          )}
        </ul>
        <FontAwesomeIcon icon={icon} className="pyro-input-field-icon"/>
      </div>
    </div>
  )
}

// Todo: Merge with classic DropDown
export const MultipleDropDown = ({
  id,
  label,
  icon,
  multiple = false,
  items = [],
  placeholder = "Select",
  filterPlacehoder = "Filter"
}: {
  id: string,
  label: string,
  icon: IconDefinition,
  multiple?: boolean,
  items: Array<SelectItem>,
  placeholder?: string,
  filterPlacehoder?: string
}) => {
  // Todo: Optimize this hot mess

  let debounceTimer: any;

  type ItemWithSelection = SelectItem & {selected: boolean}

  const [itemsWithSelection, setItemsWithSelection] = useState<Array<ItemWithSelection>>(items.map(item => ({...item, selected: false})))

  const [input, setInput] = useState<string>("")
  const [matchingItems, setMatchingItems] = useState<Array<ItemWithSelection>>(itemsWithSelection)
  const [open, setOpen] = useState<boolean>(false)
  const [arrowFocus, setArrowFocus] = useState<number|null>(null);
  const [valid, setValid] = useState<boolean|null>(null)

  const simplifyString = (input: string) => input.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    resetArrowFocus()
    // setOpen(false)
  }


  const resetArrowFocus = () => setArrowFocus(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    const isArrowUp = (e.key === "ArrowUp")
    const isArrowDown = (e.key === "ArrowDown")
    const isEnter = (e.key === "Enter")

    if (!(isArrowDown || isArrowUp || isEnter)) return;
    e.preventDefault()
    if (isEnter) {
      resetArrowFocus()
      // checkInputValidity()
      setOpen(false)
    }

    let newArrowFocus = (arrowFocus === null ? -1: arrowFocus)

    if (isArrowUp) {
      newArrowFocus--
      if (newArrowFocus < 0) newArrowFocus = matchingItems.length - 1
    }
    if (isArrowDown) {
      newArrowFocus++
      if (newArrowFocus >= matchingItems.length) newArrowFocus = 0
    }
    setInput(matchingItems[newArrowFocus].displayName)
    setArrowFocus(newArrowFocus)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputText = e.target.value
    resetArrowFocus()
    setInput(inputText)

    debounce(() => {
      setMatchingItems(itemsWithSelection.filter((item) => {
        return (simplifyString(item.displayName).includes(simplifyString(inputText)))
      }))
    // checkInputValidity()

    }, 250)
  }

  const handleOptionClick = (e: MouseEvent<HTMLLIElement>, optionIndex: number) => {
    e.preventDefault();
    setItemsWithSelection((prevItemsWithSelection)=> {
      const newItemsWithSelection = {...prevItemsWithSelection}
      newItemsWithSelection[optionIndex].selected = !newItemsWithSelection[optionIndex].selected
      return prevItemsWithSelection
    })
    // resetArrowFocus()

    // setInput((e.target as unknown as {innerText: string}).innerText)
  }

  const debounce = (func: () => any, timer: number) => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(func, timer)
  }

  const checkInputValidity = useCallback(() => {
    console.log(input, input.length)
    if (input.length === 0) {
      setValid(null);
      return;
    }
    setValid(
      items.map(({displayName}) => displayName).includes(input)
    )
  }, [items, input])

  useEffect(() => {checkInputValidity()})

  return (
    <div className="pyro-input-container">
      <label htmlFor={id}>{label}</label>
      <div className='pyro-input-field-container' >
        <input name={id} id={id} onInput={handleInput} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown} value={input} className={`pyro-input ${valid? "valid": ""} ${valid === false? "invalid": "" }`} placeholder={open? filterPlacehoder: placeholder}/>
        <ul className={`select ${open? 'open': 'closed'}`}>
          {matchingItems.map(({displayName, value, selected}, index) => 
          <>
            <FontAwesomeIcon icon={selected? faSquareCheck: faSquare}/>
            <li key={value} value={value} onClick={(e)=> handleOptionClick(e, index)} className={`select-item ${arrowFocus === index? "arrowFocused": ""} ${multiple? "multiple": ""}`}>{displayName}</li>
          </>)}
        </ul>
        <FontAwesomeIcon icon={icon} className="pyro-input-field-icon"/>
      </div>
    </div>
  )
}