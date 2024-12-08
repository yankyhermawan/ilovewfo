import { get, post } from '../utility/common'

const BASE_ENDPOINT = '/user'

interface Login {
    username: string
    password: string
}

export const login = async (data: Login) => await post(`${BASE_ENDPOINT}/login`, JSON.stringify(data))

export const checkToken = async () => await get(`${BASE_ENDPOINT}/check-token`)

export const getMyData = async () => await get(`${BASE_ENDPOINT}/me`)

export const getUsers = async (data: { room_id: number, is_logged_in: boolean }) => await get(`${BASE_ENDPOINT}/all`, data)