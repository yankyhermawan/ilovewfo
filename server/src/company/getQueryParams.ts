import { Company } from './company.interface'

interface queryParams {
    id?: number
    name?: { contains: string, mode: 'insensitive' } | string
    user?: {
        some: {
            id?: number,
            is_author?: boolean
        }
    }
}

interface requestBody extends Company {
    auto_complete?: boolean
    user_id?: number
    is_author?: string
}

const getQueryParams = (body: requestBody) => {
    const result: queryParams = {}
    const { id, name, auto_complete, user_id, is_author } = body

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
        result.user = {
            some: {
                id: Number(user_id)
            }
        }
    }

    if (is_author) {
        result.user = {
            some: {
                ...result.user?.some,
                is_author: Boolean(Number(is_author))
            }
        }
    }

    return result
}

export default getQueryParams