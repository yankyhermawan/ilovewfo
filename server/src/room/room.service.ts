import { StatusCodes } from 'http-status-codes'
import { prismaService } from '../prisma.service'
import { ResponseInterface } from '../utility/response'
import isEmpty from 'lodash/isEmpty'
import { CreateMapInterface } from './room.interface'
import map from 'lodash/map'

export default class RoomService {
    async getRoom(room_id: number): Promise<ResponseInterface> {
        if (!room_id) {
            return {
                status: StatusCodes.METHOD_NOT_ALLOWED,
                errorMessage: 'Please Provice a company ID'
            }
        }
        const res = await prismaService.room.findFirst({
            where: {
                id: room_id
            },
            include: {
                room_material: {
                    include: { material: true }
                }
            }
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

    async createRoom(user_id: number, data: CreateMapInterface): Promise<ResponseInterface> {
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
        if (!res) {
            return {
                status: StatusCodes.BAD_GATEWAY,
                message: 'Something went wrong'
            }
        }
        await prismaService.user_room.create({
            data: {
                user_id,
                room_id: createRoom.id
            }
        })
        return {
            status: StatusCodes.CREATED,
            errorMessage: 'Data saved successfully'
        }
    }

    async getRooms(user_id: number): Promise<ResponseInterface> {
        const res = await prismaService.user_room.findMany({
            where: { user_id },
            include: {
                room: true
            }
        })
        if (!res) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'No Rooms Found'
            }
        }
        return {
            status: StatusCodes.OK,
            data: res
        }
    }
}