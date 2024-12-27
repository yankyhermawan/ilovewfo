import { useState, useCallback } from 'react'
import InputSelect from '../components/InputSelect/InputSelect'
import debounce from 'lodash/debounce'
import { getUsers } from '../login/actions'
import mapUsers from '../utility/mapUsers'
import find from 'lodash/find'
import { User } from '../login/interface'
import Button from '../components/Button/Button'
import isEmpty from 'lodash/isEmpty'
import { inviteUser } from './action'
import { useParams } from 'react-router-dom'

interface Props {
    isTyping: boolean
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
}

const Invite = (props: Props) => {
    const { setIsTyping, isTyping = false } = props
    const [email, setEmail] = useState<string | undefined>('')
    const [userDatas, setUserDatas] = useState<User[]>([])
    const [selectedUserData, setSelectedUserData] = useState<User>({})
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const { id: room_id } = useParams()

    const debounceGetUsers = useCallback(
        debounce(async (opt) => {
            const res = await getUsers(opt)
            if (res?.data) {
                setUserDatas(res.data)
            }
        }, 300),
        []
    )

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
        if (value) {
            debounceGetUsers({ company_id: null, email: value, auto_complete: 1, limit: 5 })
        }
    }

    const handleSelectOptions = (value: number | string | undefined) => {
        const val = find(userDatas, dt => dt.id === value) || {}
        setSelectedUserData(val)
        setEmail(val?.email)
    }

    const handleFocus = () => {
        setIsTyping(true)
        setIsOptionsOpen(true)
    }

    const handleInvite = async() => {
        if (selectedUserData) {
            await inviteUser({ user_id: selectedUserData.id, room_id: Number(room_id) })
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <InputSelect
                additionalClassName='text-sm'
                placeholder='Search by E-mail'
                label='Add User'
                isTyping={isTyping}
                onChange={handleChangeEmail}
                onFocus={handleFocus}
                onBlur={() => setIsTyping(false)}
                value={email}
                options={mapUsers(userDatas)}
                handleClickOption={handleSelectOptions}
                isOptionsOpen={isOptionsOpen}
                setIsOptionsOpen={setIsOptionsOpen}
            />
            <Button placeholder='Invite' onClick={handleInvite} disabled={isEmpty(selectedUserData)}/>
        </div>
    )
}

export default Invite