import { Request, Response } from 'express'
import UserService from './user.service'

const userService = new UserService()

export default class UserHandler {
    async getUsersHandler(req: Request, res: Response) {
        const data = req.body
        const response = await userService.getUsers(data)
        res.status(response.status).json(response.data || response.errorMessage)
    }
}