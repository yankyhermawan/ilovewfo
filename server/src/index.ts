import express from 'express'
import cors from 'cors'
import { userRouter } from './user/user.router'
import { companyRouter } from './company/company.router'
import { materialRouter } from './material/material.router'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/company', companyRouter)
app.use('/material', materialRouter)
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})