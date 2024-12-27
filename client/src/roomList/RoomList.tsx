import { useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import { getRooms } from './action'
import { UserRoomInterface } from './interface'
import map from 'lodash/map'
import { getCompany } from '../company/action'

const RoomList = () => {
    const [userRoom, setUserRoom] = useState<UserRoomInterface[]>([])
    const [companyId, setCompanyId] = useState<number|null>(null)

    const handleCreateButton = () => {
        window.location.href = '/room/create'
    }

    const handleJoinRoom = (id: number) => () => {
        window.location.href = `/room/join/${id}`
    }

    const renderUserRoom = () => {
        return map(userRoom, (dt, key) => {
            const { room } = dt
            const { name, id } = room
            return (
                <div className='flex flex-col border border-solid border-black rounded-xl p-4 gap-4' key={key}>
                    <span>{name}</span>
                    <Button onClick={handleJoinRoom(id)} placeholder='Join'/>
                </div>
            )
        })
    }

    useEffect(() => {
        const handleGetData = async() => {
            const res = await getRooms()
            setUserRoom(res.data)
        }
        const handleGetCompanyData = async() => {
            const res = await getCompany({ is_author: 1 })
            if (res) {
                setCompanyId(res.data.id)
            }
        }
        handleGetData()
        handleGetCompanyData()
    }, [])
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='max-w-72 h-screen flex flex-col justify-evenly'>
                <div className='flex flex-col gap-4'>
                    {renderUserRoom()}
                </div>
                {companyId && <Button onClick={handleCreateButton} placeholder='Create New Room' />}
            </div>
        </div>
    )
}

export default RoomList