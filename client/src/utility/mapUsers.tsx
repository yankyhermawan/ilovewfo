import map from 'lodash/map'
import { User } from '../login/interface'
import isEmpty from 'lodash/isEmpty'

const mapUsers = (users: User[] = []) => {
    if (isEmpty(users)) return []
    return map(users, user => {
        const { id, email } = user || {}
        return {
            label: email,
            value: id
        }
    })
}

export default mapUsers