import express from 'express'
import CompanyHandler from './company.handler'

const router = express.Router()
const companyHandler = new CompanyHandler()

router.get('/', companyHandler.getCompanyHandler)
router.get('/all', companyHandler.getCompaniesHandler)
router.post('/create', companyHandler.createCompanyHandler)