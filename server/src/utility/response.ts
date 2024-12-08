import { Response } from 'express'

export interface ResponseInterface<T = unknown> {
    status: number
    data?: T
    errorMessage?: string,
    message?: string
}

export async function formatAndSendResponse(res: Response, callBack: () => Promise<ResponseInterface> | ResponseInterface) {
    try {
        const response = await callBack()
        res.status(response.status).json(response.data ? { data: response.data } : { error: response.errorMessage })
    } catch (err) {
        console.error(err)
        res.status(500).json({ "error": "Internal Service Error" })
    }
}