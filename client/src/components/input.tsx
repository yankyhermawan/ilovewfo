import map from 'lodash/map'
import uniqueId from 'lodash/uniqueId'
import toUpper from 'lodash/toUpper'
import show from '../assets/eye-regular.svg'
import hide from '../assets/eye-slash-regular.svg'
interface InputInterface {
    disabled?: boolean
    label?: string
    maxLength?: number
    minLength?: number
    onBlur?: React.FocusEventHandler
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: React.FocusEventHandler
    placeholder?: string
    required?: boolean
    type?: 'text' | 'password'
    value?: string
    additionalClassName?: string
    showIcon?: boolean
    showPassword?: boolean
    handleToggleShowHide?: () => void
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
    const {
        label = '',
        type = 'text',
        value = '',
        placeholder = '',
        onChange,
        maxLength,
        minLength,
        required = false,
        disabled = false,
        onFocus,
        onBlur,
        additionalClassName = '',
        showIcon = false,
        handleToggleShowHide,
        showPassword = false
    } = props
    const disabledClassName = disabled ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-slate-300'
    const id = uniqueId()
    return (
        <div className={`flex flex-col gap-2 w-full ${additionalClassName}`}>
            <label
                htmlFor={id}
            >
                {required && <span className='text-red-500'>* </span>}
                {label}
            </label>
            <div className="relative w-full">
                <input
                    className={`w-full p-2 pr-10 border border-black border-solid rounded-lg focus:bg-slate-100 ${disabledClassName}`}
                    disabled={disabled}
                    id={id}
                    maxLength={maxLength}
                    minLength={minLength}
                    type={showPassword ? 'text' : type}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    required={required}
                />
                {showIcon && (
                    <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent border-none p-0 focus:outline-none"
                        onClick={handleToggleShowHide}
                    >
                        <img
                        src={showPassword ? show : hide}
                        alt={showPassword ? 'Show' : 'Hide'}
                        width={16}
                        height={16}
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

const Button = (props: ButtonInterface) => {
    const { placeholder = 'Submit', onClick, disabled = false } = props
    const allowedCursor = disabled ? 'cursor-not-allowed' : ''
    const bg = disabled ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-600'
    return (
        <button
            className={`${allowedCursor} ${bg} p-2 rounded-xl w-full max-w-72 m-auto`}
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
        <div className='w-full p-4 bg-white/10 rounded-t-xl text-center font-semibold text-xl'>
            {toUpper(title)}
        </div>
    )
}

export { Input, Button, Select, Title }