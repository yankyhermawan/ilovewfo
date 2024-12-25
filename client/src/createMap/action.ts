import { get, post } from '../utility/request'
import { CreateMapInterface } from './interface'

const BASE_ENDPOINT = '/room'

export const createMap = (data: CreateMapInterface) => post(`${BASE_ENDPOINT}/create`, JSON.stringify(data))

export const getMap = () => get(`${BASE_ENDPOINT}/all`)