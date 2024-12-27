import { endpoint } from './constants'
import notification from '../components/notification'

const token = localStorage.getItem('token')

export const get = async (prefix: string, data?: Record<string, any>, notif?: boolean) => {
    try {
        const queryString = data
            ? `?${new URLSearchParams(data).toString()}`
            : ''
        const res = await fetch(`${endpoint}${prefix}${queryString}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const jsonData = await res.json()
        if (jsonData.error && notif) {
            notification({
                code: res.status,
                msg: jsonData.error
            })
        }
        return {
            status: res.status,
            data: jsonData.data
        }
    } catch (err) {
        return {
            status: 500,
            data: 'Error'
        }
    }
}

export const post = async (prefix: string, data: string) => {
    try {
        const res = await fetch(`${endpoint}${prefix}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: data
        })
        const jsonData = await res.json()
        notification({
            code: res.status,
            msg: jsonData.message || jsonData.error
        })
        
        return {
            status: res.status,
            data: jsonData.data
        }
    } catch (err) {
        return {
            status: 500,
            data: 'Error'
        }
    }
}

export const update = async (prefix: string, data: string) => {
    try {
        const res = await fetch(`${endpoint}${prefix}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: data
        })
        const jsonData = await res.json()
        notification({
            code: res.status,
            msg: jsonData.message || jsonData.error
        })
        
        return {
            status: res.status,
            data: jsonData.data
        }
    } catch (err) {
        return {
            status: 500,
            data: 'Error'
        }
    }
}