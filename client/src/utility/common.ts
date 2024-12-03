import { endpoint } from './endpoint'
const token = localStorage.getItem('token')

export const regexNumberOnly = /^[0-9]*$/

export const regexLowercase = /^[a-z]/

export const regexUppercase = /^[A-Z]/

export const regexCharNumber = /^[a-zA-Z0-9]+$/

export const regexSymbol = /.*?[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\.\?/\\|`~]+$/

export const regexSpace = /\s/

export const get = async (prefix: string, data?: Record<string, any>) => {
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
        return {
            status: res.status,
            data: jsonData
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
        return {
            status: res.status,
            data: jsonData
        }
    } catch (err) {
        return {
            status: 500,
            data: 'Error'
        }
    }
}