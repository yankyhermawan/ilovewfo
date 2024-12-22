export interface InputInterface {
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