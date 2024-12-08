import { room_material } from '@prisma/client'

export interface CreateMaterial {
    name: string
    rotation: number
    width: number
    height: number
    walkable: boolean
    image_url: string
}

export interface Material {
    name?: string
    image?: string
    rotation?: number
    width?: number
    height?: number
    walkable?: boolean
    image_url?: string
    room_material?: room_material | room_material[]
}