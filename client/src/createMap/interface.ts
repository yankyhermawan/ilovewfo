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

export interface CreateMapInterface {
    name: string
    entry_point_x: number
    entry_point_y: number
    materialCellData: MaterialCellData[]
}