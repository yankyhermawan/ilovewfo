import { Request, Response } from 'express'
import { getUserIdFromToken } from '../user/user.guard'
import MapService from './map.service'
import { formatAndSendResponse } from '../utility/response'

const mapService = new MapService()

export default class MapHandler {
    async createHandler(req: Request, res: Response) {
        const tokenData = getUserIdFromToken(req)
        const data = req.body
        formatAndSendResponse(res, () => mapService.createMap(Number(tokenData?.id), data))
    }
}