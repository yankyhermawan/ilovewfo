import { InputInterface } from './interface'
import uniqueId from 'lodash/uniqueId'
import show from '../../assets/eye-regular.svg'
import hide from '../../assets/eye-slash-regular.svg'

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
                    className={`w-full p-2 border border-black border-solid rounded-lg focus:bg-slate-100 ${disabledClassName}`}
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

export default Input