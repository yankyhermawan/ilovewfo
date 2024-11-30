import { get, post } from '../utility/common'
import { MaterialCellData } from './CreateMap'
import { toApi } from './transformer'
import map from 'lodash/map'

const BASE_ENDPOINT = '/map'

export const createMap = (data: MaterialCellData[]) => post(`${BASE_ENDPOINT}/create`, JSON.stringify(map(data, dt => toApi(dt))))

export const getMap = () => get(`${BASE_ENDPOINT}/all`)