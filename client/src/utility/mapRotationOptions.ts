import map from 'lodash/map'
import { MaterialInterface } from '../material/interface'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

export const rotations = [0, 90, 180, 270]
export const rotationOptions = (existingData: MaterialInterface[]) => map(rotations, rot => ({
    label: String(rot),
    value: String(rot),
    disabled: !isEmpty(find(existingData, dt => dt.rotation === rot))
}))