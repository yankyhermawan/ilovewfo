import { company_map } from '@prisma/client'

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
    company_map?: company_map | company_map[]
}