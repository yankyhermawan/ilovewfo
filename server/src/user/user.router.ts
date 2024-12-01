import express from 'express'
import UserHandler from './user.handler'

const userRouter = express.Router()
const userHandler = new UserHandler()

userRouter.get('/all', userHandler.getUsersHandler)
userRouter.post('/register', userHandler.registerHandler)
userRouter.post('/login', userHandler.loginHandler)
userRouter.post('/otp', userHandler.generateOtpHandler)
userRouter.post('/forgetpassword', userHandler.forgetPasswordHandler)
userRouter.get('/', userHandler.getUserHandler)
userRouter.get('/check-token', userHandler.checkTokenValidHandler)

export { userRouter }