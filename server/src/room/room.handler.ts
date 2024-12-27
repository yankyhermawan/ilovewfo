import { Request, Response } from 'express'
import { getUserIdFromToken } from '../user/user.guard'
import RoomService from './room.service'
import { formatAndSendResponse } from '../utility/response'

const roomService = new RoomService()

export default class RoomHandler {
    async createHandler(req: Request, res: Response) {
        const tokenData = getUserIdFromToken(req)
        const data = req.body
        formatAndSendResponse(res, () => roomService.createRoom(Number(tokenData?.id), data))
    }

    async getRoomHandler(req: Request, res: Response) {
        const { room_id } = req.query
        formatAndSendResponse(res, () => roomService.getRoom(Number(room_id)))
    }

    async getRoomsHandler(req: Request, res: Response) {
        const { id } = getUserIdFromToken(req)
        formatAndSendResponse(res, () => roomService.getRooms(Number(id)))
    }

    async inviteUserHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => roomService.inviteUsers(data))
    }
}