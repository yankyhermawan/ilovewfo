import { StatusCodes } from 'http-status-codes'
import { prismaService, prismaPagination } from '../prisma.service'
import { CreateMaterial, Material } from './material.interface'
import { ResponseInterface } from '../utility/response'
import getQueryParams from './getQueryParams'
import isEmpty from 'lodash/isEmpty'
import { Pagination } from '../utility/common'

export default class MaterialService {

    async createMaterial(data: CreateMaterial[]): Promise<ResponseInterface> {
        const res = await prismaService.material.createMany({
            data
        })
        if (res) {
            return {
                status: StatusCodes.CREATED,
                data: res
            }
        }
        return {
            status: StatusCodes.BAD_GATEWAY,
            errorMessage: 'Something went wrong'
        }
    }

    async getMaterials(data: Material, pagination: Partial<Pagination>): Promise<ResponseInterface> {
        const res = await prismaPagination.material({
            ...pagination,
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

    async getCompanyMaterials(id: number): Promise<ResponseInterface> {
        const res = await prismaService.material.findMany({
            where: {
                company_map: {
                    some: {
                        company_id: id
                    }
                }
            },
            include: {
                company_map: true
            }
        })
        return {
            status: StatusCodes.OK,
            data: res
        }
    }
}