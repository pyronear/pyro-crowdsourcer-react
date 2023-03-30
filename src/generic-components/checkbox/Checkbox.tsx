
import './Checkbox.scss'
export const Checkbox = ({ label, onChecked, checked }: { label: string, onChecked: (newState: boolean) => void, checked: boolean }): JSX.Element => {
  const onCheckboxClick = (e: any): void => {
    onChecked(e.target.checked)
  }
  return (
    <>
      <label className="checkboxContainer">
        <div>
          <input type="checkbox" className={`pyro-checkbox${checked ? ' checked' : ''}`} onChange={onCheckboxClick}/>
          <span>{label}</span>
        </div>
      </label>
    </>
  )
}
