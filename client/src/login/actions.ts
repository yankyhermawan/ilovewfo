import { get, post } from '../utility/request'

const BASE_ENDPOINT = '/user'

interface Login {
    username: string
    password: string
}

interface Register extends Login {
    name: string
    email: string
}

export const login = async (data: Login) => await post(`${BASE_ENDPOINT}/login`, JSON.stringify(data))

export const checkToken = async () => await get(`${BASE_ENDPOINT}/check-token`)

export const getMyData = async () => await get(`${BASE_ENDPOINT}/me`)

export const getUsers = async (data: { room_id: number, is_logged_in: number }) => await get(`${BASE_ENDPOINT}/all`, data)

export const register = async(data: Register) => await post(`${BASE_ENDPOINT}/register`, JSON.stringify(data))

export const logout = async() => await get(`${BASE_ENDPOINT}/logout`)