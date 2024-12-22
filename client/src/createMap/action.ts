import { get, post } from '../utility/request'
import { MaterialCellData } from './interface'
import { toApi } from './transformer'
import map from 'lodash/map'

const BASE_ENDPOINT = '/map'

export const createMap = (data: MaterialCellData[]) => post(`${BASE_ENDPOINT}/create`, JSON.stringify(map(data, dt => toApi(dt))))

export const getMap = () => get(`${BASE_ENDPOINT}/all`)