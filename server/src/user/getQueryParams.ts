import { FindUser } from './user.interface'

interface queryParams {
    id?: number
    company_id?: number
    name?: string | { contains: string, mode: 'insensitive' }
    username?: string | { contains: string, mode: 'insensitive' },
    room_id?: number,
    is_logged_in?: boolean
}

interface bodyParams extends FindUser {
    auto_complete?: boolean,
    room_id?: number,
    is_logged_in?: string
}

const getQueryParams = (body: bodyParams) => {
    const { id, name, company_id, username, auto_complete, room_id, is_logged_in } = body
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

    if (room_id) {
        result.room_id = room_id
    }

    if (is_logged_in) {
        result.is_logged_in = is_logged_in === "true" ? true : false
    }

    return result
}

export default getQueryParams