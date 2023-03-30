import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { simplifyString } from '../../helpers/strings'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export type Value = string | number
interface SelectItem { displayName: string, value: Value }

export const DropDown = ({
  id,
  label,
  icon,
  multiple = false,
  items = [],
  placeholder = 'Choisir',
  filterPlacehoder = 'Filtrer',
  onChange,
  initialValue = null
}: {
  id: string
  label: string
  icon: IconDefinition
  multiple?: boolean
  items: SelectItem[]
  placeholder?: string
  filterPlacehoder?: string
  onChange: (value: Value | null) => void
  initialValue?: string | null
}): JSX.Element => {
  // Todo: Optimize this hot mess

  const [input, setInput] = useState<string>('')
  const [confirmedInput, setConfirmedInput] = useState<string>(input)
  const [matchingItems, setMatchingItems] = useState<SelectItem[]>(items)
  const [open, setOpen] = useState<boolean>(false)
  const [arrowFocus, setArrowFocus] = useState<number | null>(null)
  const [valid, setValid] = useState<boolean | null>(null)

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setOpen(true)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    e.preventDefault()
    resetArrowFocus()
    setOpen(false)
    setConfirmedInput(input)
  }

  const resetArrowFocus = (): void => setArrowFocus(null)

  const handleKeyDown = (e: KeyboardEvent): void => {
    const isArrowUp = (e.key === 'ArrowUp')
    const isArrowDown = (e.key === 'ArrowDown')
    const isEnter = (e.key === 'Enter')

    if (!(isArrowDown || isArrowUp || isEnter)) return
    e.preventDefault()
    if (isEnter) {
      resetArrowFocus()
      setOpen(false)
      setConfirmedInput(input)
      return
    }

    let newArrowFocus = (arrowFocus === null ? -1 : arrowFocus)

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

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    updateInput(e.target.value)
  }

  const updateInput = (inputText: string): void => {
    resetArrowFocus()
    setInput(inputText)

    setMatchingItems(items.filter((item) => {
      return (simplifyString(item.displayName).includes(simplifyString(inputText)))
    }))
  }

  const handleOptionClick = (e: MouseEvent<HTMLLIElement>): void => {
    e.preventDefault()
    resetArrowFocus()

    const clickedInput = (e.target as HTMLLIElement).dataset.value as string
    setInput(clickedInput)
    setConfirmedInput(clickedInput)
  }

  const checkInputValidity = (): void => {
    if (confirmedInput.length === 0) {
      setValid(null)
      onChange(null)
      return
    }
    for (const item of items) {
      if (item.displayName === confirmedInput) {
        setValid(true)
        onChange(item.value)
        break
      }
      setValid(false)
      onChange(null)
    }
  }

  useEffect(() => checkInputValidity(), [confirmedInput])

  useEffect(() => {
    if (initialValue !== null) setInput(initialValue)
  }, [])

  const clearInput = (e: MouseEvent<SVGSVGElement>): void => { e.preventDefault(); setInput('') }

  return (
    <div className="field-container">
      <label htmlFor={id}>{label}</label>
      <div className='input-container' onFocus={handleFocus} onBlur={handleBlur}>
        <input name={id} id={id} onInput={handleInput} onKeyDown={handleKeyDown} value={input} className={`input ${(valid ?? false) ? 'valid' : ''} ${valid === false ? 'invalid' : ''} ${open ? 'open' : 'closed'}`} placeholder={open ? filterPlacehoder : placeholder}/>
        {open
          ? <FontAwesomeIcon icon={faCircleXmark} className="input-icon clear-icon" onMouseDown={clearInput}/>
          : <FontAwesomeIcon icon={icon } className="input-icon"/>
        }
      </div>
      <ul className={`select ${open ? 'open' : 'closed'}`}>
        {matchingItems.map(({ displayName, value }, index) =>
          <li data-value={value} key={value} value={value} onClick={handleOptionClick} className={`select-item ${arrowFocus === index ? 'arrowFocused' : ''} ${multiple ? 'multiple' : ''}`}>{displayName}</li>
        )}
      </ul>
    </div>
  )
}
