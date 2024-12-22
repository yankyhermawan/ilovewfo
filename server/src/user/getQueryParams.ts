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
    auto_complete?: number,
    room_id?: number,
    is_logged_in?: string
}

const getQueryParams = (body: bodyParams) => {
    const { id, name, company_id, username, auto_complete, room_id, is_logged_in } = body
    console.log(body)
    const result: queryParams = {}

    if (Number(id)) {
        result.id = Number(id)
    }

    if (name && Number(auto_complete)) {
        result.name = { contains: name, mode: 'insensitive' }
    }

    if (name && !Number(auto_complete)) {
        result.name = name
    }

    if (username && Number(auto_complete)) {
        result.username = { contains: username, mode: 'insensitive' }
    }

    if (username && !Number(auto_complete)) {
        result.username = username
    }

    if (Number(company_id)) {
        result.company_id = Number(company_id)
    }

    if (Number(room_id)) {
        result.room_id = Number(room_id)
    }

    if (Number(is_logged_in)) {
        result.is_logged_in = Boolean(Number(is_logged_in))
    }

    return result
}

export default getQueryParams