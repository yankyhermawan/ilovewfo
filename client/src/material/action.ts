import { MaterialInterface } from './material'
import { get, post } from '../utility/common'
import { toApi } from './transformer'
import map from 'lodash/map'

const BASE_ENDPOINT = '/material'

export const createMaterial = (data: MaterialInterface[]) => post(`${BASE_ENDPOINT}/create`, JSON.stringify(map(data, dt => toApi(dt))))

export const getMaterials = (opt: Record<string, any>) => get(`${BASE_ENDPOINT}/all`, opt)

export const getCompanyMaterials = (data: { id: number }) => get(`${BASE_ENDPOINT}/company-materials`, data)