import avatar from '../assets/avatar.svg'
import moment from 'moment'

interface ChatInterface {
    sender: string
    time: string
    message: string
    isMe: boolean
}

const BubbleChat = (props: ChatInterface) => {
    const { sender, time, message, isMe } = props
    return ( 
    <div className="flex items-start gap-2.5">
        {isMe && <img className="w-8 h-8 rounded-full" src={avatar} />}
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender}</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(time).isValid() ? moment.utc(time).local().format('HH:mm:ss') : ''}</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
        </div>
        {!isMe && <img className="w-8 h-8 rounded-full" src={avatar} />}
    </div>
    )
}

export default BubbleChat