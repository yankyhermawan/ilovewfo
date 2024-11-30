import { MaterialInterface } from './material'

export const toApi = (data: MaterialInterface) => ({
    name: data.name,
    rotation: Number(data.rotation),
    width: Number(data.width),
    height: Number(data.height),
    walkable: Boolean(data.walkable),
    image_url: String(data.image_url),
    is_identical: Boolean(data.is_identical)
})