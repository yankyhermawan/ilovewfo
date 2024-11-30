export interface Company {
    id?: number
    name?: string
}

export interface CreateCompany {
    name: string
    x_length: number
    y_length: number
    entry_point_x: number
    entry_point_y: number
}