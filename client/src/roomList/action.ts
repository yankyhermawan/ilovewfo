import { get } from '../utility/request'

const BASE_URL = '/room'

export const getRooms = () => get(`${BASE_URL}/all`)