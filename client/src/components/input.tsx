import map from 'lodash/map'
import uniqueId from 'lodash/uniqueId'
import toUpper from 'lodash/toUpper'
interface InputInterface {
    disabled?: boolean
    label?: string
    maxLength?: number
    minLength?: number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    type?: 'text' | 'password'
    value?: string
}

interface ButtonInterface {
    placeholder?: string,
    onClick: () => void,
    disabled?: boolean
}

interface SelectInterface {
    disabled?: boolean
    required?: boolean
    label?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: number | undefined
    options?: { label: string, value: string, disabled?: boolean }[]
    disabledPlaceholder?: string[]
}

const Input = (props: InputInterface) => {
    const { label = '', type = 'text', value = '', placeholder = '', onChange, maxLength, minLength, required = false, disabled = false } = props
    const disabledClassName = disabled ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-slate-300'
    const id = uniqueId()
    return (
        <div className='flex flex-col gap-2'>
            <label
                htmlFor={id}
            >
                {required && <span className='text-red-500'>* </span>}
                {label}
            </label>
            <input
                className={`border border-black border-solid rounded-lg p-2 focus:bg-slate-100 ${disabledClassName}`}
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                minLength={minLength}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

const Button = (props: ButtonInterface) => {
    const { placeholder = 'Submit', onClick, disabled = false } = props
    const allowedCursor = disabled ? 'cursor-not-allowed' : ''
    const bg = disabled ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-600'
    return (
        <button
            className={`${allowedCursor} ${bg} p-2 rounded-xl w-full`}
            disabled={disabled}
            onClick={onClick}
        >
            {placeholder}
        </button>
    )
}

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

const Title = ({ title }: { title: string }) => {
    return (
        <div className='w-full p-4 bg-white/10 rounded-t-xl text-center font-semibold text-xl font-serif'>
            {toUpper(title)}
        </div>
    )
}

export { Input, Button, Select, Title }