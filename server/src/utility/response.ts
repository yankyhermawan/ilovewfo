import { Response } from 'express'
import { UserResponse } from '../user/user.interface'
import { Company } from '../company/company.interface'
import { MapInterface } from '../map/map.interface'
import { Material } from '../material/material.interface'

export interface ResponseInterface {
    status: number
    data?: UserResponse[] | UserResponse | Company[] | Company | { message: string } | MapInterface | MapInterface[] | Material | Material[]
    errorMessage?: string
}

export async function formatAndSendResponse(res: Response, callBack: () => Promise<ResponseInterface> | ResponseInterface) {
    try {
        const response = await callBack()
        res.status(response.status).json(response.data || { error: response.errorMessage })
    } catch (err) {
        console.log(err)
        res.status(500).json({ "error": "Internal Service Error" })
    }
}