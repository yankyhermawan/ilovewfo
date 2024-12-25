import { useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import { getRooms } from './action'
import { UserRoomInterface } from './interface'
import map from 'lodash/map'

const RoomList = () => {
    const [userRoom, setUserRoom] = useState<UserRoomInterface[]>([])

    const handleCreateButton = () => {
        window.location.href = '/room/create'
    }

    const handleJoinRoom = (id: number) => () => {
        window.location.href = `/room/join/${id}`
    }

    const renderUserRoom = () => {
        return map(userRoom, dt => {
            const { room } = dt
            const { name, id } = room
            return (
                <div className='flex flex-col border border-solid border-black rounded-xl p-4 gap-4'>
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
        handleGetData()
    }, [])
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='max-w-72 h-screen flex flex-col justify-evenly'>
                <div className='flex flex-col gap-4'>
                    {renderUserRoom()}
                </div>
                <Button onClick={handleCreateButton} placeholder='Create New Room' />
            </div>
        </div>
    )
}

export default RoomList