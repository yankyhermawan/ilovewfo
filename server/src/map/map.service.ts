import { StatusCodes } from 'http-status-codes'
import { prismaService } from '../prisma.service'
import { ResponseInterface } from '../utility/response'
import isEmpty from 'lodash/isEmpty'
import { CreateMapInterface } from './map.interface'
import map from 'lodash/map'

export default class MapService {
    async getMap(company_id: number): Promise<ResponseInterface> {
        if (!company_id) {
            return {
                status: StatusCodes.METHOD_NOT_ALLOWED,
                errorMessage: 'Please Provice a company ID'
            }
        }
        const res = await prismaService.company_map.findMany({
            where: { company_id }
        })
        if (isEmpty(res)) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'Material Not Found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: res
        }
    }

    async createMap(user_id: number, data: CreateMapInterface[]): Promise<ResponseInterface> {
        const user = await prismaService.user.findFirst({
            where: { id: user_id }
        })
        if (!user) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User not found'
            }
        }
        const { company_id } = user
        if (!company_id) {
            return {
                status: StatusCodes.NOT_ACCEPTABLE,
                errorMessage: 'Please create a company first'
            }
        }
        const mappedData = map(data, dt => ({ ...dt, company_id }))
        const res = await prismaService.company_map.createMany({
            data: mappedData
        })
        if (res) {
            return {
                status: StatusCodes.CREATED,
                message: 'Data saved successfully'
            }
        }
        return {
            status: StatusCodes.BAD_GATEWAY,
            errorMessage: 'Something went wrong'
        }
    }
}