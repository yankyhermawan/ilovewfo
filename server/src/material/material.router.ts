import express from 'express'
import MaterialHandler from './material.handler'

const materialRouter = express.Router()
const materialHandler = new MaterialHandler()

materialRouter.post('/create', materialHandler.createHandler)
materialRouter.get('/all', materialHandler.getMaterialsHandler)

export { materialRouter }