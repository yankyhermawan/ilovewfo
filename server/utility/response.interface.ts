import { User } from '../src/user/user.interface'

export interface Response {
    status: number
    data?: User[] | User
    errorMessage?: string
}