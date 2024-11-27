export interface User {
    id?: number
    username?: string
    password?: string | undefined
    name?: string
}

export interface FindUser {
    id?: number
    username?: string
    name?: string
}