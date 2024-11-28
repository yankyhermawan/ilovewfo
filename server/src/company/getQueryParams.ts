import { Company } from './company.interface'

interface queryParams {
    id?: number
    name?: { contains: string, mode: 'insensitive' } | string
}

interface requestBody extends Company {
    auto_complete?: boolean
}

const getQueryParams = (body: requestBody) => {
    const result: queryParams = {}
    const { id, name, auto_complete } = body

    if (id) {
        result.id = id
    }

    if (name && auto_complete) {
        result.name = { contains: name, mode: 'insensitive' }
    }

    if (name && !auto_complete) {
        result.name = name
    }
    return result
}

export default getQueryParams