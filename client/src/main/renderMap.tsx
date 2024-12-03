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

interface MappedMaterials {
    image_url: string | ArrayBuffer
    height: number
    width: number
    walkable: boolean
    position_x: number
    position_y: number
}

interface Map {
    size: number[],
    userPosition: UserPosition[],
    materials: MappedMaterials[]
}

const renderMap = (props: Map) => {
    const { size, userPosition, materials } = props
    if (size.length !== 2 || includes(size, 0)) return null
    const renderResult = []
    for (let i = size[1] - 1; i >= 0; i--) {
        const res = []
        for (let j = 0; j < size[0]; j ++) {
            const currentUser = find(userPosition, pos => pos.x === j && pos.y === i)
            const currentMaterials = find(materials, mat => mat.position_x === j && mat.position_y === i)
            const img = !isEmpty(currentUser) ? <img src={person} width={24} height={24} className='absolute'/> : <></>
            const materialImg = !isEmpty(currentMaterials) ? <img src={currentMaterials.image_url as string} className='w-full h-full'/> : <></>
            res.push(
                <div
                className={`flex flex-col flex-nowrap w-16 h-16 justify-center cursor-pointer border border-black border-solid items-center`}
                key={`${i}-${j}`}
                >
                    {img}
                    {materialImg}
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