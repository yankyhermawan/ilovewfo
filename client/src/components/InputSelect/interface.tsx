export interface InputSelectInterface {
    disabled?: boolean
    label?: string
    maxLength?: number
    minLength?: number
    isTyping?: boolean
    onBlur?: React.FocusEventHandler
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: React.FocusEventHandler
    placeholder?: string
    type?: 'text' | 'password'
    value?: string
    additionalClassName?: string
    options?: Options[]
    handleClickOption: (value: number | string | undefined) => void
    isOptionsOpen: boolean
    setIsOptionsOpen: (val: boolean) => void
}

interface Options {
    label?: string
    value?: string | number
}