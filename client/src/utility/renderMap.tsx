import person from '../assets/person-solid.svg'

const renderMap = ({ map, currentPosition }: { map: number[], currentPosition: number[] }) => {
    const renderResult = []
    if (map.length !== 2) return null
    for (let i = 0; i < map[1]; i ++) {
        const res = []
        for (let j = 0; j < map[0]; j ++) {
            const name = (i+j) % 2 === 0 ? 'bg-red-400' : 'bg-blue-400'
            const img = i === currentPosition[1] && j === currentPosition[0] && currentPosition.length === 2 ? <img src={person} width={24} height={24}/> : <></>
            res.push(
                <div className={`flex ${name} w-16 h-16 justify-center`} key={`${i}-${j}`}>
                    {img}
                </div>
            )
        }
        renderResult.push(
            <div className='flex flex-row' key={`${i}`}>
                {res}
            </div>
        )
    }
    return renderResult
}

export default renderMap