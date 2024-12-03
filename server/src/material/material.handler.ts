import { formatAndSendResponse } from '../utility/response'
import MaterialService from './material.service'
import { Request, Response } from 'express'

const materialService = new MaterialService()

export default class MaterialHandler {

    async createHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => materialService.createMaterial(data))
    }

    async getMaterialsHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => materialService.getMaterials(data))
    }

    async getCompanyMaterialsHandler(req: Request, res: Response) {
        const id = Number(req.query.id)
        formatAndSendResponse(res, () => materialService.getCompanyMaterials(id))
    }
}