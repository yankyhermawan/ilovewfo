import { Request, Response } from 'express'
import CompanyService from './company.service'
import { formatAndSendResponse } from '../utility/response'
import { getUserIdFromToken } from '../user/user.guard'

const companyService = new CompanyService()

export default class CompanyHandler {
    async createCompanyHandler(req: Request, res: Response) {
        const user_id = getUserIdFromToken(req).id
        const data = req.body
        data.user_id = user_id
        formatAndSendResponse(res, () => companyService.createCompany(data))
    }

    async getCompanyHandler(req: Request, res: Response) {
        const data = req.query
        formatAndSendResponse(res, () => companyService.getCompany(data))
    }

    async getCompaniesHandler(req: Request, res: Response) {
        const name = req.body.name
        formatAndSendResponse(res, () => companyService.getCompanies(name))
    }

    async updateCompanyHandler(req: Request, res: Response) {
        const data = req.body
        formatAndSendResponse(res, () => companyService.updateCompany(data))
    }
}