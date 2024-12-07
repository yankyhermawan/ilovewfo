import { StatusCodes } from 'http-status-codes'
import { prismaService } from '../prisma.service'
import { ResponseInterface } from '../utility/response'
import { Company, CreateCompany } from './company.interface'
import getQueryParams from './getQueryParams'

export default class CompanyService {
    async createCompany(data: CreateCompany): Promise<ResponseInterface> {
        if (!data.name) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Please provide a company name'
            }
        }
        const response = await prismaService.company.create({
            data: { ...data }
        })
        if (response) {
            return {
                status: StatusCodes.CREATED,
                message: 'Data Created'
            }
        }
        return {
            status: StatusCodes.BAD_GATEWAY,
            errorMessage: 'Something went wrong'
        }
    }

    async getCompanies(name: string): Promise<ResponseInterface> {
        const response = await prismaService.company.findMany({
            where: {
                name: { contains: name }
            }
        })
        return {
            status: StatusCodes.OK,
            data: response
        }
    }

    async getCompany(data: Company): Promise<ResponseInterface> {
        const response = await prismaService.company.findFirst({
            where: {
                ...getQueryParams(data)
            },
            include: {
                user: true
            }
        })
        if (!response) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'Company not found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: response
        }
    }
}