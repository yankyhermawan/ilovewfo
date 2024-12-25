import express from 'express'
import cors from 'cors'
import { userRouter } from './user/user.router'
import { companyRouter } from './company/company.router'
import { materialRouter } from './material/material.router'
import { roomRouter } from './room/room.router'
import { createServer } from 'http'
import initSocket from './socket/socket.router'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cors())

const server = createServer(app)
initSocket(server)

app.use('/user', userRouter)
app.use('/company', companyRouter)
app.use('/material', materialRouter)
app.use('/room', roomRouter)
server.listen(port, () => {
    console.log(`Listening on ${port}`)
})