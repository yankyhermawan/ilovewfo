export interface CreateMaterial {
    name: string
    image: string
    position_x: number
    position_y: number
    rotation: number
    width: number
    height: number
    walkable: boolean
    image_url: string
}

export interface Material {
    name?: string
    image?: string
    position_x?: number
    position_y?: number
    rotation?: number
    width?: number
    height?: number
    walkable?: boolean
    image_url?: string
}