import { MaterialInterface } from '../material/material'

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