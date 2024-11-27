import { PrismaService } from '../prisma.service'
import { FindUser } from './user.interface'
import { Response } from '../../utility/response.interface'
import { StatusCodes } from 'http-status-codes'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import omit from 'lodash/omit'

export default class UserService {
    private readonly prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService()
    }

    async getUsers(data: FindUser): Promise<Response> {
        const response = await this.prismaService.user.findMany({
            where: {
                ...data
            }
        })
        if (isEmpty(response)) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'No Users Found'
            }
        }
        const result = map(response, res => ({...omit(res, 'password')}))
        return {
            status: StatusCodes.OK,
            data: result
        }
    }
}