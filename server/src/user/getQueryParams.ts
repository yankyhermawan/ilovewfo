import { FindUser } from './user.interface'

interface queryParams {
    id?: number
    company_id?: number
    name?: string | { contains: string, mode: 'insensitive' }
    username?: string | { contains: string, mode: 'insensitive' }
}

interface bodyParams extends FindUser {
    auto_complete?: boolean
}

const getQueryParams = (body: bodyParams) => {
    const { id, name, company_id, username, auto_complete } = body
    const result: queryParams = {}

    if (id) {
        result.id = id
    }

    if (name && auto_complete) {
        result.name = { contains: name, mode: 'insensitive' }
    }

    if (name && !auto_complete) {
        result.name = name
    }

    if (username && auto_complete) {
        result.username = { contains: username, mode: 'insensitive' }
    }

    if (username && !auto_complete) {
        result.username = username
    }

    if (company_id) {
        result.company_id = company_id
    }

    return result
}

export default getQueryParams