import { toast } from 'react-toastify'
import startsWith from 'lodash/startsWith'

export enum NotificationEnum {
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error'
}

interface NotificationWithType {
    type: NotificationEnum
    code?: never
}

interface NotificationWithCode {
    type?: never
    code: number
}

type NotificationProps = (NotificationWithType | NotificationWithCode) & {
    msg?: string
}

const notification = (props: NotificationProps) => {
    const { type, code = 0, msg = '' } = props

    if (startsWith(String(code), '1') || type === NotificationEnum.info) {
        return toast.info(msg, {
            autoClose: 1000
        })
    }

    if (startsWith(String(code), '2') || type === NotificationEnum.success) {
        return toast.success(msg || 'Success!', {
            autoClose: 1000,
        })
    }

    if (type === NotificationEnum.warning) {
        return toast.warning(msg, {
            autoClose: 1000
        })
    }
    
    if (startsWith(String(code), '4') || startsWith(String(code), '5') || type === NotificationEnum.error) {
        return toast.error(msg || 'Error', {
            autoClose: 1000
        })
    }
}

export default notification