export interface UserRoomInterface {
    id: number
    room_id: number
    user_id: number
    room: RoomInterface
}

interface RoomInterface {
    company_id: number
    entry_point_x: number
    entry_point_y: number
    id: number
    name: string
}