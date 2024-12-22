import { Company } from './company.interface'

interface queryParams {
    id?: number
    name?: { contains: string, mode: 'insensitive' } | string
    user_id?: number
}

interface requestBody extends Company {
    auto_complete?: boolean
    user_id?: number
}

const getQueryParams = (body: requestBody) => {
    const result: queryParams = {}
    const { id, name, auto_complete, user_id } = body

    if (id) {
        result.id = id
    }

    if (name && auto_complete) {
        result.name = { contains: name, mode: 'insensitive' }
    }

    if (name && !auto_complete) {
        result.name = name
    }

    if (Number(user_id)) {
        result.user_id = Number(user_id)
    }
    return result
}

export default getQueryParams