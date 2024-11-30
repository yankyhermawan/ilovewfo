import { formatAndSendResponse } from '../utility/response'
import MaterialService from './material.service'
import { Request, Response } from 'express'

export default class MaterialHandler {
    private readonly materialService: MaterialService
    constructor() {
        this.materialService = new MaterialService()
    }

    async createHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => this.materialService.createMaterial(data))
    }

    async getMaterialsHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => this.materialService.getMaterials(data))
    }
}