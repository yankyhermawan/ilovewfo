import express from 'express'
import UserHandler from './user.handler'

const userRouter = express.Router()
const userHandler = new UserHandler()

userRouter.get('/all', userHandler.getUsersHandler)

export { userRouter }