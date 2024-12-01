import { get, post } from '../utility/common'

const BASE_ENDPOINT = '/user'

interface Login {
    username: string
    password: string
}

export const login = async (data: Login) => await post(`${BASE_ENDPOINT}/login`, JSON.stringify(data))

export const checkToken = async () => await get(`${BASE_ENDPOINT}/check-token`)