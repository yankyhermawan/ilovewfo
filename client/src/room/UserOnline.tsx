import { myData } from './interface'
import map from 'lodash/map'
import avatar from '../assets/avatar.svg'

const UserOnline = ({ data }: { data: myData[] }) => {
    return map(data, (dt, key) => {
        const { image_url, name } = dt
        return (
            <div key={key}>
                <div className='flex flex-row gap-2'>
                    <img src={image_url || avatar} className='rounded-full w-8 h-8' />
                    <span>{name}</span>
                </div>
            </div>
        )
    })
}

export default UserOnline