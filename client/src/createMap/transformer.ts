import { MaterialCellData } from './CreateMap'

export const toApi = (data: MaterialCellData) => ({
    material_id: data.materialId,
    position_x: data.position.x,
    position_y: data.position.y
})