import { SelectInterface } from './interface'
import uniqueId from 'lodash/uniqueId'
import map from 'lodash/map'

const Select = (props: SelectInterface) => {
    const { label, value, options, onChange, required = false, disabled = false, disabledPlaceholder = '' } = props
    const id = uniqueId()
    const allowedCursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    const bg = disabled ? 'bg-gray-400' : 'hover:bg-slate-300'
    return (
        <div className='flex flex-col'>
            <label
                htmlFor={id}
            >
                {required && <span className='text-red-500'>* </span>}
                {label}
            </label>
            <select
                className={`border border-black border-solid p-2 rounded-lg duration-100 focus:bg-slate-100 ${allowedCursor} ${bg}`}
                disabled={disabled}
                id={id}
                onChange={onChange}
                value={value}
            >
                {map(options, (opt, key) => {
                    const { label, value, disabled = false } = opt
                    return (
                    <option value={value} key={key} disabled={disabled || false}>
                        {label}
                    </option>
                    )
                })}
            </select>
            {disabledPlaceholder && map(disabledPlaceholder, str => <span className='text-red-500 text-sm'>* {str}</span>)}
        </div>
    )
}

export default Select