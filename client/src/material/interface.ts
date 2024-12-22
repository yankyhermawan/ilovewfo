export interface MaterialInterface {
    id?: number
    name: string
    rotation: number
    image_url: string | ArrayBuffer
    walkable: boolean
    width: number
    height: number
    is_identical: number
}