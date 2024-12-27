import { get, post, update } from '../utility/request'

const BASE_URL = '/company'

export const getCompany = (data?: { user_id?: number, is_author?: number }, needNotif: boolean = false) => get(`${BASE_URL}`, data, needNotif)

export const createCompany = (data: { name: string }) => post(`${BASE_URL}/create`, JSON.stringify(data))

export const updateCompany = (data: { id: number, name: string }) => update(`${BASE_URL}/update`, JSON.stringify(data))