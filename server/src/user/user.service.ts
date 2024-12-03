import { prismaService } from '../prisma.service'
import { FindUser } from './user.interface'
import { ResponseInterface } from '../utility/response'
import { StatusCodes } from 'http-status-codes'
import isEmpty from 'lodash/isEmpty'
import getQueryParams from './getQueryParams'

export default class UserService {
    async getUsers(data: FindUser): Promise<ResponseInterface> {
        const response = await prismaService.user.findMany({
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
        const response = await prismaService.user.findFirst({
            where: { ...getQueryParams(data) },
            include: { company: true }
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

    async getMyData(userId: number | null): Promise<ResponseInterface> {
        if (!userId) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Invalid User ID'
            }
        }
        const res = await prismaService.user.findUnique({
            where: { id: userId }
        })
        if (!res) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User does not exist'
            }
        }
        return {
            status: StatusCodes.OK,
            data: res
        }
    }
}