import express from 'express'
import CompanyHandler from './company.handler'

const companyRouter = express.Router()
const companyHandler = new CompanyHandler()

companyRouter.get('/', companyHandler.getCompanyHandler)
companyRouter.get('/all', companyHandler.getCompaniesHandler)
companyRouter.post('/create', companyHandler.createCompanyHandler)

export { companyRouter }