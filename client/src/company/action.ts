import { get, post, update } from '../utility/common'

const BASE_URL = '/company'

export const getCompany = (data: { user_id: number }) => get(`${BASE_URL}`, data)

export const createCompany = (data: { name: string }) => post(`${BASE_URL}/create`, JSON.stringify(data))

export const updateCompany = (data: { id: number, name: string }) => update(`${BASE_URL}/update`, JSON.stringify(data))