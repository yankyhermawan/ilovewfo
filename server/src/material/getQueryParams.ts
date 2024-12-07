import { Material } from './material.interface'

interface MaterialParams {
    name?: string | { contains: string, mode: 'insensitive' }
    walkable?: boolean
}

interface RequestBody extends Material {
    auto_complete?: boolean
}

const getQueryParams = (data: RequestBody) => {
    const result: MaterialParams = {}
    const { name, walkable, auto_complete } = data

    if (name && !Number(auto_complete)) {
        result.name = name
    }

    if (name && !!Number(auto_complete)) {
        result.name = { contains: name, mode: 'insensitive' }
    }

    if (walkable) {
        result.walkable = walkable
    }

    return result
}

export default getQueryParams