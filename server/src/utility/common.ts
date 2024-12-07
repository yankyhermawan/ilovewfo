import { Request } from 'express'

export interface Pagination {
    skip: number
    take: number
}

export const getPagination = (req: Request) => {
    const { page = 0, limit = 8 } = req.query

    const result: Partial<Pagination> = {}
    if (Number(page) > 0) {
        result.skip = Number(limit) * Number(page) + 1
    }
    result.take = Number(limit)
    return result
}