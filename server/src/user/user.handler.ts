import { Request, Response } from 'express'
import UserService from './user.service'
import { formatAndSendResponse } from '../utility/response'
import UserAuth from './user.auth'

const userService = new UserService()
const userAuth = new UserAuth()

export default class UserHandler {
    async getUsersHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => userService.getUsers(data))
    }

    async getUserHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => userService.getUser(data))
    }

    async registerHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => userAuth.register(data))
    }

    async loginHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => userAuth.login(data))
    }

    async generateOtpHandler(req: Request, res: Response) {
        const data = req.body.username
        formatAndSendResponse(res, () => userAuth.generateOtp(data))
    }

    async forgetPasswordHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => userAuth.forgetPassword(data))
    }
}