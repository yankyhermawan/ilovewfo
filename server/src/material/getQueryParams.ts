import { Material } from './material.interface'

interface MaterialParams {
    name?: string
    walkable?: boolean
}
const getQueryParams = (data: Material) => {
    const result: MaterialParams = {}
    const { name, walkable } = data

    if (name) {
        result.name = name
    }

    if (walkable) {
        result.walkable = walkable
    }

    return result
}

export default getQueryParams