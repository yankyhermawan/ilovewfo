import person from '../assets/person-solid.svg'
import { MaterialCellData, Position } from '../createMap/interface'
import { MaterialInterface } from '../material/interface'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { Fragment } from 'react'
interface MapInterface {
    map: number[]
    currentPosition?: number[]
    handleClickCell: (i: number, j: number) => (e: React.MouseEvent<HTMLDivElement>) => void
    selectedCell: Position[]
    materialCellData?: MaterialCellData[],
    materials?: MaterialInterface[]
}

const renderMap = (props: MapInterface) => {
    const { map, currentPosition = [], handleClickCell, selectedCell = [], materialCellData = [], materials = [] } = props
    const renderResult = []
    if (map.length !== 2 || map.includes(0)) return null
    for (let i = map[1] - 1; i >= 0; i--) {
        const res = []
        for (let j = 0; j < map[0]; j ++) {
            const selected = !isEmpty(find(selectedCell, dt => dt.x === i && dt.y === j)) ? 'bg-blue-300' : 'hover:bg-blue-300'
            const img = i === currentPosition[1] && j === currentPosition[0] && currentPosition.length === 2 ? <img src={person} width={24} height={24}/> : <></>
            const currentCell = find(materialCellData, dt => dt.position.x === i && dt.position.y === j)
            const currentMaterial = find(materials, dt => dt.id === currentCell?.materialId)
            const materialImg = currentMaterial ? <img src={currentMaterial.image_url as string} className='w-full h-full' /> : <></>
            res.push(
                <Fragment key={`${i}-${j}`}>
                    {j === 0 && <div className='mr-4'>{i}</div>}
                    <div
                    className={`flex flex-col flex-nowrap w-16 h-16 justify-center cursor-pointer border border-black border-solid ${selected}`}
                    onClick={(e) => handleClickCell(i, j)(e)}
                    >
                        {img}
                        {materialImg}
                    </div>
                    {j === map[0] - 1 && <div className='ml-4'>{i}</div>}
                </Fragment>
                
            )
        }
        renderResult.push(
            <div className='flex flex-row flex-nowrap items-center justify-center' key={`${i}`}>
                {res}
            </div>
        )
    }
    return renderResult
}

export default renderMap