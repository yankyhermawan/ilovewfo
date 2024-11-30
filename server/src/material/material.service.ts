import { StatusCodes } from 'http-status-codes'
import { prismaService } from '../prisma.service'
import { CreateMaterial, Material } from './material.interface'
import { ResponseInterface } from '../utility/response'
import getQueryParams from './getQueryParams'
import isEmpty from 'lodash/isEmpty'

export default class MaterialService {

    async createMaterial(data: CreateMaterial): Promise<ResponseInterface> {
        const res = await prismaService.material.create({
            data
        })
        return {
            status: StatusCodes.CREATED,
            data: res
        }
    }

    async getMaterials(data: Material): Promise<ResponseInterface> {
        const res = await prismaService.material.findMany({
            where: {
                ...getQueryParams(data)
            }
        })
        if (isEmpty(res)) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'No Materials Found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: res
        }
    }
}