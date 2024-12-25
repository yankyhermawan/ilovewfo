import { ButtonInterface } from "./interface"

const Button = (props: ButtonInterface) => {
    const { placeholder = 'Submit', onClick, disabled = false } = props
    const allowedCursor = disabled ? 'cursor-not-allowed' : ''
    const bg = disabled ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-600'
    return (
        <button
            className={`${allowedCursor} ${bg} p-2 rounded-xl w-full max-w-72 mx-auto`}
            disabled={disabled}
            onClick={onClick}
        >
            {placeholder}
        </button>
    )
}

export default Button