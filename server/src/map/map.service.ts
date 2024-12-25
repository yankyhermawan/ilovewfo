import { StatusCodes } from 'http-status-codes'
import { prismaService } from '../prisma.service'
import { ResponseInterface } from '../utility/response'
import isEmpty from 'lodash/isEmpty'
import { CreateMapInterface } from './map.interface'
import map from 'lodash/map'

export default class MapService {
    async getMap(room_id: number): Promise<ResponseInterface> {
        if (!room_id) {
            return {
                status: StatusCodes.METHOD_NOT_ALLOWED,
                errorMessage: 'Please Provice a company ID'
            }
        }
        const res = await prismaService.room_material.findMany({
            where: { room_id }
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

    async createMap(user_id: number, data: CreateMapInterface): Promise<ResponseInterface> {
        const user = await prismaService.user.findFirst({
            where: { id: user_id }
        })
        if (!user) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User not found'
            }
        }
        const company = await prismaService.company.findFirst({
            where: { user_id: user_id }
        })
        if (!company) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'Company Not Found'
            }
        }
        const { id } = company
        if (!id) {
            return {
                status: StatusCodes.NOT_ACCEPTABLE,
                errorMessage: 'Please create a company first'
            }
        }
        // const mappedData = map(data, dt => ({ ...dt, company_id: id }))
        const createRoom = await prismaService.room.create({
            data: {
                name: data.name,
                company_id: company.id,
                entry_point_x: data.entry_point_x,
                entry_point_y: data.entry_point_y
            }
        })
        if (!createRoom) {
            return {
                status: StatusCodes.BAD_GATEWAY,
                errorMessage: 'Error Creating Room'
            }
        }
        const mappedData = map(data.materialCellData, dt => ({
            material_id: dt.materialId,
            position_x: dt.position.x,
            position_y: dt.position.y,
            room_id: createRoom.id
        }))
        const res = await prismaService.room_material.createMany({
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