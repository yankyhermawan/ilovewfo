import { Response } from 'express'
import { UserResponse } from '../user/user.interface'
import { Company } from '../company/company.interface'

export interface ResponseInterface {
    status: number
    data?: UserResponse[] | UserResponse | Company[] | Company | { message: string }
    errorMessage?: string
}

export async function formatAndSendResponse(res: Response, callBack: () => Promise<ResponseInterface>) {
    try {
        const response = await callBack()
        res.status(response.status).json(response.data || response.errorMessage)
    } catch (err) {
        console.log(err)
        res.status(500).json({ "erorr": "Internal Service Error" })
    }
}