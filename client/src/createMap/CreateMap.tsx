import React, { useState, useEffect } from 'react'
import renderMap from '../utility/renderMap'
import { regexNumberOnly } from '../utility/constants'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import { MaterialInterface } from '../material/interface'
import { getMaterials } from '../material/action'
import map from 'lodash/map'
import { Card } from '../components/materialCard'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import { createMap } from './action'
import debounce from 'lodash/debounce'
import { useEffectAfterMount } from '../utility/customHooks'
import Pagination from '../components/Pagination'
import { Position, MaterialCellData } from './interface'

const CreateMap = () => {
    const [mapName, setMapName] = useState('')
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [selectedCoordinates, setSelectedCoordinates] = useState<Position[]>([])
    const [materials, setMaterials] = useState<MaterialInterface[]>([])
    const [nextButtonClicked, setNextButtonClicked] = useState(false)
    const [materialSelectedId, setMaterialSelectedId] = useState<number>(0)
    const [materialCellData, setMaterialCellData] = useState<MaterialCellData[]>([])
    const [totalData, setTotalData] = useState(0)
    const [entryX, setEntryX] = useState(0)
    const [entryY, setEntryY] = useState(0)
    const [options, setOptions] = useState({
        name: '',
        limit: 5,
        page: 0,
        auto_complete: 1
    })

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

    const handleClickCell = (i: number, j: number) => () => {
        const dupData = filter(selectedCoordinates, dt => dt.id === `${i}-${j}`)
        if (isEmpty(dupData)) {
            setSelectedCoordinates(prevState => [...prevState, { id: `${i}-${j}`, x: i, y: j }])
        } else {
            const uniqueData = filter(selectedCoordinates, dt => dt.id !== `${i}-${j}`)
            setSelectedCoordinates(uniqueData)
        }
        
    }

    const handleClickMaterialCard = (id: number) => () => {
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
                    <Card materials={materials} handleClickMaterial={handleClickMaterialCard} selectedMaterialId={materialSelectedId}/>
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
        const data = {
            name: mapName,
            entry_point_x: entryX,
            entry_point_y: entryY,
            materialCellData
        }
        createMap(data)
    }

    const handleChangeEntryPoint = (type = '') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!regexNumberOnly.test(value)) return
        const numValue = Number(value)
        if (type === 'x') {
            if (entryY === 0 || entryX === height - 1) {
                if (numValue >= 0 && numValue <= width - 1) {
                    setEntryX(numValue)
                }
            } else {
                if (numValue === 0 || numValue === width -1) {
                    setEntryX(numValue)
                }
            }
        }
        if (type === 'y') {
            if (entryX === 0 || entryX === width - 1) {
                if (numValue >= 0 && numValue <= height - 1) {
                    setEntryY(numValue)
                }
            } else {
                if (numValue === 0 || numValue === height - 1) {
                    setEntryY(numValue)
                }
            }
        }
    }
    
    const handleChangeMapName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setMapName(val)
    }

    const getData = async () => {
        const res = await getMaterials(options)
        const total = res.data.count
        const data = res.data.rows
        setMaterials(data)
        setTotalData(total)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setOptions(prevState => ({
            ...prevState,
            name: val
        }))
    }

    const handlePagination = (page: number) => () => {
        setOptions(prevState => ({ ...prevState, page }))
    }
    
    const debouncedGetData = debounce(getData, 300)

    useEffect(() => {
        getData()
    }, [])

    useEffectAfterMount(() => {
        debouncedGetData()
    }, [options])

    return (
        <div className='flex flex-row justify-between h-screen items-center'>
            <div className='w-full h-screen'>
                <div className='w-fit m-auto h-full flex flex-col justify-between items-center py-4'>
                    <div className='max-w-96 items-center'>
                        <Input label='Map Name' additionalClassName='items-center' required={true} onChange={handleChangeMapName} value={mapName} />
                    </div>
                    <div>
                        {!!width && !!height && 
                        <div className='flex justify-evenly'>
                            {map(new Array(width), (_, key) => <div key={key}>{key}</div>)}
                        </div>}
                        {renderMap({
                            map: [width, height],
                            handleClickCell: nextButtonClicked ? handleClickCell : () => () => {},
                            selectedCell: selectedCoordinates,
                            materialCellData,
                            materials
                        })}
                        {!!width && !!height && 
                        <div className='flex justify-evenly'>
                            {map(new Array(width), (_, key) => <div key={key}>{key}</div>)}
                        </div>}
                    </div>
                    <Button onClick={handleSubmit} disabled={materialCellData.length !== width * height || !width || !height || !nextButtonClicked}/>
                </div>
            </div>
            {!nextButtonClicked && 
            <div className={`border fixed right-0 bg-gray-300/50 border-black border-solid m-5 flex flex-col p-2 flex-end gap-8 ${!nextButtonClicked ? '' : 'hidden'}`}>
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
            <div className={`border max-w-72 fixed right-0 bg-gray-300/50 border-black border-solid m-5 flex flex-col p-2 flex-end gap-8 h-full ${nextButtonClicked ? '' : 'hidden'}`}>
                <Input label='Search material' onChange={handleSearch} value={options.name} />
                <Pagination limit={options.limit} page={options.page} total={totalData} onChange={handlePagination}/>
                {renderMaterials()}
                <Button placeholder='APPLY' onClick={handleClickApply} disabled={!materialSelectedId || isEmpty(selectedCoordinates) || isEmpty(mapName)}/>
            </div>
            }
        </div>
    )
}

export default CreateMap