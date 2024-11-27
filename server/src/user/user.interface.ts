import { Position } from "@prisma/client"

export interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    position: Position | null
    company_id: number
}

export interface UserResponse {
    id: number
    username: string
    name: string
    position: Position | null
    token?: string
}

export interface FindUser {
    id?: number
    username?: string
    name?: string,
    company_id?: number
}

export interface LoginUser {
    username: string
    password: string
}

export interface ForgetPassword {
    username: string
    new_password: string
    otp_number: number
}