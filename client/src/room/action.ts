import { get } from '../utility/request'

const BASE_URL = '/room'

export const getRoom = (room_id: number) => get(`${BASE_URL}/`, { room_id })