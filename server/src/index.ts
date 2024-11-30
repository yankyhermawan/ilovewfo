import express from 'express'
import cors from 'cors'
import { userRouter } from './user/user.router'
import { companyRouter } from './company/company.router'
import { materialRouter } from './material/material.router'
import { mapRouter } from './map/map.router'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cors())

app.use('/user', userRouter)
app.use('/company', companyRouter)
app.use('/material', materialRouter)
app.use('/map', mapRouter)
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})