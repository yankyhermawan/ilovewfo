import { useState, useEffect } from 'react'
import renderMap from '../utility/renderMap'
import { regexNumberOnly } from '../utility/common'
import { Input, Button } from '../components/input'
import { MaterialInterface } from '../material/material'
import { getMaterials } from '../material/action'
import map from 'lodash/map'
import { Card } from '../components/materialCard'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import { createMap } from './action'

export interface Position {
    id: string
    x: number
    y: number
}

export interface MaterialCellData {
    id: string
    position: Position
    materialId: number
}

const CreateMap = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [selectedCoordinates, setSelectedCoordinates] = useState<Position[]>([])
    const [materials, setMaterials] = useState<MaterialInterface[]>([])
    const [nextButtonClicked, setNextButtonClicked] = useState(false)
    const [materialSelectedId, setMaterialSelectedId] = useState<number>(0)
    const [materialCellData, setMaterialCellData] = useState<MaterialCellData[]>([])
    const [entryX, setEntryX] = useState(0)
    const [entryY, setEntryY] = useState(0)

    const handleChangePosition = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (type === 'x') {
            const regexValue = regexNumberOnly.test(value)
            if (regexValue) {
                setWidth(Number(value))
            }
        }
        if (type === 'y') {
            const regexValue = regexNumberOnly.test(value)
            if (regexValue) {
                setHeight(Number(value))
            }
        }
    }

    const handleClickCell = (i: number, j: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        const dupData = filter(selectedCoordinates, dt => dt.id === `${i}-${j}`)
        if (isEmpty(dupData)) {
            setSelectedCoordinates(prevState => [...prevState, { id: `${i}-${j}`, x: i, y: j }])
        } else {
            const uniqueData = filter(selectedCoordinates, dt => dt.id !== `${i}-${j}`)
            setSelectedCoordinates(uniqueData)
        }
        
    }

    const handleClickMaterialCard = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (!materialSelectedId) {
            setMaterialSelectedId(id)
        } else {
            setMaterialSelectedId(0)
        }
    }

    const renderMaterials = () => {
        return (
            <div className='flex flex-col items-center'>
                <span className='w-fit'>Materials Available</span>
                <div className='flex flex-row flex-wrap gap-4 justify-center'>
                    {map(materials, (dt, key) => (
                        <Card key={key} material={dt} handleClickMaterial={handleClickMaterialCard} selectedMaterialId={materialSelectedId}/>
                    ))}
                </div>
            </div>
        )
    }

    const handleClickApply = () => {
        const cellIds = map(selectedCoordinates, dt => dt.id)
        const uniqueData = filter(materialCellData, dt => !includes(cellIds, dt.id))
        const newState: MaterialCellData[] = []
        map(selectedCoordinates, dt => {
            newState.push({
                id: dt.id,
                position: { id: `${dt.x}-${dt.y}`, x: dt.x, y: dt.y },
                materialId: materialSelectedId
            })
        })
        setMaterialCellData([...uniqueData, ...newState])
        setMaterialSelectedId(0)
        setSelectedCoordinates([])
    }

    const handleSubmit = () => {
        createMap(materialCellData)
    }

    const handleChangeEntryPoint = (type = '') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (type === 'x') {
            const regexValue = regexNumberOnly.test(value)
            if (regexValue && (Number(value) === 0 || Number(value) === width - 1)) {
                setEntryX(Number(value))
            }
        }
        if (type === 'y') {
            const regexValue = regexNumberOnly.test(value)
            if (regexValue && (Number(value) === 0 || Number(value) === height - 1)) {
                setEntryY(Number(value))
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await getMaterials()
            const data = res.data
            setMaterials(data)
        }
        getData()
    }, [])

    return (
        <div className='flex flex-row justify-between h-screen items-center'>
            <div className='w-full h-screen'>
                <div className='w-fit m-auto h-full flex flex-col justify-between'>
                    <div>
                        {!!width && !!height && <div className='flex justify-evenly'>
                            {map(new Array(width), (val, key) => <div>{key}</div>)}
                        </div>}
                        {renderMap({
                            map: [width, height],
                            handleClickCell: nextButtonClicked ? handleClickCell : () => () => {},
                            selectedCell: selectedCoordinates,
                            materialCellData,
                            materials
                        })}
                        {!!width && !!height && <div className='flex justify-evenly'>
                            {map(new Array(width), (val, key) => <div>{key}</div>)}
                        </div>}
                    </div>
                    <Button onClick={handleSubmit} disabled={materialCellData.length !== width*height}/>
                </div>
            </div>
            {!nextButtonClicked && <div className={`border border-black border-solid m-5 flex flex-col p-2 flex-end gap-8 ${!nextButtonClicked ? '' : 'hidden'}`}>
                <Input label='Width' maxLength={2} onChange={handleChangePosition('x')} value={String(width)} required={true}/>
                <Input label='Height' maxLength={2} onChange={handleChangePosition('y')} value={String(height)} required={true}/>
                <div>
                    <span>Entry Point</span>
                    <Input label={!!width && !!height ? `X (0 or ${width - 1})` : 'X'} maxLength={2} onChange={handleChangeEntryPoint('x')} value={String(entryX)} required={true}/>
                    <Input label={!!width && !!height ? `Y (0 or ${height - 1})` : 'Y'} maxLength={2} onChange={handleChangeEntryPoint('y')} value={String(entryY)} required={true}/>
                </div>
                <Button placeholder='NEXT' onClick={() => setNextButtonClicked(true)} disabled={!width || !height}/>
            </div>}
            {nextButtonClicked &&
            <div className={`border border-black border-solid m-5 flex flex-col p-2 flex-end gap-8 h-full ${nextButtonClicked ? '' : 'hidden'}`}>
                {renderMaterials()}
                <Button placeholder='APPLY' onClick={handleClickApply} disabled={!materialSelectedId || isEmpty(selectedCoordinates)}/>
            </div>
            }
        </div>
    )
}

export default CreateMap