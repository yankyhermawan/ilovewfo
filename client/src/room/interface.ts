import { MaterialInterface } from '../material/interface'

export interface MaterialInterfaceWithPosition extends MaterialInterface {
	position_x: number
	position_y: number
}

export interface MaterialResponse extends MaterialInterface {
	company_material: {
		position_x: number
		position_y: number
	}[]
}

export interface myData {
    company_id: number
    email: string
	id: number
    image_url: string | ''
	name: string
	room_id: number | null
    username: string
}

export interface chat {
	sender_id: number
	message: string,
	time: string
}

export interface UserPosition {
    id: number
    x: number
    y: number
    src: string
}

export interface Map {
    size: number[],
    userPosition: UserPosition[],
    materials: RenderRoomMaterialInterface[]
}

export interface RenderRoomMaterialInterface {
    name: string
    position_x: number
    position_y: number
    image_url: string | ArrayBuffer
    height: number
    width: number
    rotation: number
    walkable: boolean
}

export interface RoomInterface {
    company_id: number
    entry_point_x: number
    entry_point_y: number
    id: number
    name: string
    room_material: RoomMaterialInterface[]
}

interface RoomMaterialInterface {
    id: number
    material_id: number
    position_x: number
    position_y: number
    room_id: number
    material: MaterialInterface
}