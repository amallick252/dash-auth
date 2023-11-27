import {useId, forwardRef} from 'react'
import './input.scss'

const Input = forwardRef(function({
    label,
    type,
    className= "input",
    placeholder,
    ...props
}, ref) {
    const id = useId()
    return (
      <div>
        {label && <label
        htmlFor={id}
        >{label}</label>}
        <input 
        id = {id}
        type={type}
        placeholder={placeholder ||"amba"}
        ref={ref}
        className={`${className}`}
        {...props}
        />
      </div>
    )
  }
)

export default Input