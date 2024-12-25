export interface MapInterface {
    id: number
    company_id: number
    material_id: number
    position_x: number
    position_y: number
}

export interface CreateMapInterface {
    name: string
    entry_point_x: number
    entry_point_y: number
    materialCellData: MaterialCellData[]
}

export interface Position {
    id: string
    x: number
    y: number
}

export interface MaterialCellData {
    id: string
    position: Position
    materialId: number
}