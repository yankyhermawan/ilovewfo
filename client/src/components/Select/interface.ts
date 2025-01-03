export interface SelectInterface {
    disabled?: boolean
    required?: boolean
    label?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: number | undefined
    options?: { label: string, value: string | number, disabled?: boolean }[]
    disabledPlaceholder?: string[]
}