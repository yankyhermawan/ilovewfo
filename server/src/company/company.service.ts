import { StatusCodes } from 'http-status-codes'
import { PrismaService } from '../prisma.service'
import { ResponseInterface } from '../utility/response'
import { Company } from './company.interface'

export default class CompanyService {
    private readonly prismaService: PrismaService
    constructor() {
        this.prismaService = new PrismaService()
    }

    async createCompany(data: Company): Promise<ResponseInterface> {
        if (!data.name) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Please provide a company name'
            }
        }
        const response = await this.prismaService.company.create({
            data: { name: data.name }
        })
        return {
            status: StatusCodes.CREATED,
            data: response
        }
    }

    async getCompanies(name: string): Promise<ResponseInterface> {
        const response = await this.prismaService.company.findMany({
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
        const response = await this.prismaService.company.findFirst({
            where: {
                OR: [
                    { id: data.id },
                    { name: { contains: data.name } }
                ]
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