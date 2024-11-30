import map from 'lodash/map'
const yesNo = ['No', 'Yes']
export const yesNoOptions = map(yesNo, (val, key) => ({
    label: val,
    value: String(key)
}))