import { PrismaService } from '../prisma.service'
import { FindUser } from './user.interface'
import { ResponseInterface } from '../utility/response'
import { StatusCodes } from 'http-status-codes'
import isEmpty from 'lodash/isEmpty'
import getQueryParams from './getQueryParams'

export default class UserService {
    private readonly prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService()
    }

    async getUsers(data: FindUser): Promise<ResponseInterface> {
        const response = await this.prismaService.user.findMany({
            omit: {
                password: true
            },
            where: { ...getQueryParams(data) }
        })
        if (isEmpty(response)) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'No Users Found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: response
        }
    }

    async getUser(data: FindUser): Promise<ResponseInterface> {
        const response = await this.prismaService.user.findFirst({
            omit: { password: true },
            where: { ...getQueryParams(data) }
        })
        if (isEmpty(response)) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User Not Found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: response
        }
    }
}