import Button from "../components/Button/Button"

const RoomList = () => {
    const handleClickButtonCreate = () => {
        window.location.href = '/room/create'
    }
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='max-w-72 h-screen flex flex-col justify-center'>
                <Button onClick={handleClickButtonCreate} placeholder='Create New Room' />
            </div>
        </div>
    )
}

export default RoomList