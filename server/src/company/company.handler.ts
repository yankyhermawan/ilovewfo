import { Request, Response } from 'express'
import CompanyService from './company.service'
import { formatAndSendResponse } from '../utility/response'

const companyService = new CompanyService()

export default class CompanyHandler {
    async createCompanyHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => companyService.createCompany(data))
    }

    async getCompanyHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => companyService.getCompany(data))
    }

    async getCompaniesHandler(req: Request, res: Response) {
        const name = req.body.name
        formatAndSendResponse(res, () => companyService.getCompanies(name))
    }
}