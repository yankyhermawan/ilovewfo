import { StatusCodes } from 'http-status-codes'
import { PrismaService } from '../prisma.service'
import { CreateMaterial, Material } from './material.interface'
import { ResponseInterface } from '../utility/response'
import getQueryParams from './getQueryParams'
import isEmpty from 'lodash/isEmpty'

export default class MaterialService {
    private readonly prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService()
    }

    async createMaterial(data: CreateMaterial): Promise<ResponseInterface> {
        const res = await this.prismaService.material.create({
            data
        })
        return {
            status: StatusCodes.CREATED,
            data: res
        }
    }

    async getMaterials(data: Material): Promise<ResponseInterface> {
        const res = await this.prismaService.material.findMany({
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