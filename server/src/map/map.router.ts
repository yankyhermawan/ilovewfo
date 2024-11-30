import express from 'express'
import MapHandler from './map.handler'

const mapRouter = express.Router()
const mapHandler = new MapHandler()

mapRouter.post('/create', mapHandler.createHandler)

export { mapRouter }