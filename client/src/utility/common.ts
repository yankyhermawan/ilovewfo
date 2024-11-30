import { endpoint } from './endpoint'
const token = ''

export const regexNumberOnly = /^[0-9]*$/

export const get = async (prefix: string) => {
    return fetch(`${endpoint}${prefix}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const post = async (prefix: string, data: string) => {
    fetch(`${endpoint}${prefix}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}