import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import includes from 'lodash/includes'
import person from '../assets/person-solid.svg'

interface UserPosition {
    id: number
    x: number
    y: number
    src: string
}

interface Map {
    size: number[],
    userPosition: UserPosition[]
}

const renderMap = (props: Map) => {
    const { size, userPosition } = props
    if (size.length !== 2 || includes(size, 0)) return null
    const renderResult = []
    for (let i = size[1] - 1; i >= 0; i--) {
        const res = []
        for (let j = 0; j < size[0]; j ++) {
            const currentUser = find(userPosition, pos => pos.x === j && pos.y === i)
            const img = !isEmpty(currentUser) ? <img src={person} width={24} height={24}/> : <></>
            res.push(
                <div
                className={`flex flex-col flex-nowrap w-16 h-16 justify-center cursor-pointer border border-black border-solid items-center`}
                key={`${i}-${j}`}
                >
                    {img}
                </div>
            )
        }
        renderResult.push(
            <div className='flex flex-row flex-nowrap items-center' key={`${i}`}>
                {res}
            </div>
        )
    }
    return renderResult
}

export default renderMap