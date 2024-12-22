import { User } from '../login/interface'

export interface Company {
    id?: number
    name?: string
    user_id?: number
    user?: User
}