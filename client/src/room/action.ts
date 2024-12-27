import { get, post } from '../utility/request'

const BASE_URL = '/room'

export const getRoom = (room_id: number) => get(`${BASE_URL}/`, { room_id })

export const inviteUser = (data: { user_id: number|undefined, room_id: number|undefined }) => post(`${BASE_URL}/invite`, JSON.stringify(data))