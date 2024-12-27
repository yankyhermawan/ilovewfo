import Input from '../Input/Input'
import { InputSelectInterface } from './interface'
import map from 'lodash/map'

const InputSelect = (props: InputSelectInterface) => {
    const {
        disabled,
        label,
        maxLength,
        minLength,
        isOptionsOpen,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        type,
        value,
        additionalClassName,
        options,
        handleClickOption,
        setIsOptionsOpen
    } = props

    const handleSelect = (value: string | number | undefined) => {
        handleClickOption(value)
        setIsOptionsOpen(false)
    }

    const renderOptions = () => {
        return (
            map(options, opt => {
                const { label, value } = opt
                return (
                    <div key={value} className='hover:bg-blue-200 cursor-pointer p-2 bg-white w-full' onClick={() => handleSelect(value)}>
                        {label}
                    </div>
                )
            })
        )
    }

    return (
        <div className='relative'>
            <Input
                disabled={disabled}
                label={label}
                maxLength={maxLength}
                minLength={minLength}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                type={type}
                value={value}
                additionalClassName={additionalClassName}
            />
            {(isOptionsOpen) && 
            <div className='flex flex-col gap-2 text-sm h-fit absolute left-0 right-0 z-10 pt-2 bg-white'>
                {renderOptions()}
            </div>}
        </div>
    )
}

export default InputSelect