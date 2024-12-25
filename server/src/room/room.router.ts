import express from 'express'
import RoomHandler from './room.handler'

const roomRouter = express.Router()
const roomHandler = new RoomHandler()

roomRouter.post('/create', roomHandler.createHandler)
roomRouter.get('/all', roomHandler.getRoomsHandler)
roomRouter.get('/', roomHandler.getRoomHandler)

export { roomRouter }