import { useState } from 'react'
import { convertImage } from '../utility/imageToBase64'
import Uploader from '../components/uploader'
import { Input, Button, Select } from '../components/input'
import isEmpty from 'lodash/isEmpty'
import { regexNumberOnly } from '../utility/common'
import { yesNoOptions } from '../utility/yesNoOptions'
import { rotationOptions } from '../utility/mapRotationOptions'
import map from 'lodash/map'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import find from 'lodash/find'
import { useEffectAfterMount } from '../utility/customHooks'
import { createMaterial } from './action'
import filter from 'lodash/filter'

export interface MaterialInterface {
    id?: number
    name: string
    rotation: number
    image_url: string | ArrayBuffer
    walkable: number
    width: number
    height: number
    is_identical: number
}
const Material = () => {
    const [name, setName] = useState<string>('')
    const [rotation, setRotation] = useState<number>(0)
    const [base64String, setBase64String] = useState<string | ArrayBuffer>('')
    const [walkable, setWalkable] = useState<number>(0)
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)
    const [sumData, setSumData] = useState<MaterialInterface[]>([])
    const [disabledButton, setDisabledButton] = useState(false)
    const [applyForAll, setApplyForAll] = useState(0)
    const [errorPlaceholderIdentical, setErrorPlaceholderIdentical] = useState<string[]>([])

    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file && file.length > 0) {
            const base64 = await convertImage(file[0])
            if (base64) {
                setBase64String(base64)
            }
        }
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeRotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value)
        const prevData = sumData.length > 0 ? sumData[sumData.length - 1] : {}
        setRotation(value)
        if (!isEmpty(prevData)) {
            const prevRotation = get(prevData, 'rotation', 0)
            const prevHeight = get(prevData, 'height', 0)
            const prevWidth = get(prevData, 'width', 0)
            if ((value / 90) % 2 !== (prevRotation / 90) % 2) {
                setWidth(prevHeight)
                setHeight(prevWidth)
            } else {
                setWidth(prevWidth)
                setHeight(prevHeight)
            }
        }
        
    }

    const onChangeWalkable = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setWalkable(Number(value))
    }

    const onChangeDimensions = (dir: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (regexNumberOnly.test(value) && Number(value) > 0) {
            if (dir === 'x') {
                setWidth(Number(value))
                if (applyForAll) {
                    setHeight(Number(value))
                }
            }
            if (dir === 'y') {
                setHeight(Number(value))
                if (applyForAll) {
                    setWidth(Number(value))
                }
            }
        }
    }

    const onSubmit = () => {
        const data = {
            name,
            rotation,
            image_url: base64String,
            walkable,
            width,
            height,
            is_identical: applyForAll
        }
        setBase64String('')
        setSumData(prevState => [...prevState, data])
        const filteredData = filter(rotationOptions([]), dt => Number(dt.value) !== rotation)
        setRotation(Number(filteredData[0].value) || 0)
    }

    const renderPreview = () => {
        const orderedData = orderBy(sumData, 'rotation', 'asc')
        return map(orderedData, dt => (
            <div className='flex flex-col'>
                <span>Rotation: {dt.rotation}</span>
                <span>Width: {dt.width}</span>
                <span>Height: {dt.height}</span>
                <img src={dt.image_url as string} className='w-32 h-32'/>
            </div>
        ))
    }

    const handleChangeApplyForAll = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setApplyForAll(Number(value))
    }

    const handleSave = () => {
        createMaterial(sumData)
    }

    useEffectAfterMount(() => {
        const isRotationExist = !isEmpty(find(sumData, dt => dt.rotation === rotation))
        const isDisabledButton = isEmpty(name) || isEmpty(base64String) || !width || !height || isRotationExist || sumData.length === 4

        setDisabledButton(isDisabledButton)
    }, [base64String, rotation])

    useEffectAfterMount(() => {
        const arr = []
        if (!applyForAll && width !== height) {
            const err = 'Set the same value of width and height to enable this option'
            arr.push(err)
        }
        if (!width || !height) {
            const err = 'Width and height must be more than zero!'
            arr.push(err)
        }
        setErrorPlaceholderIdentical(arr)
    }, [width, height, sumData])
    
    return (
        <div className='flex flex-end justify-between items-center'>
            <div className='flex w-full justify-center'>
            {!isEmpty(sumData) &&
                <div className='flex flex-col w-fit items-center gap-16'>
                    <div className='w-fit'>
                        <span>Preview</span>
                    </div>
                    <div className='flex flex-row gap-5 flex-wrap max-w-72'>
                        {renderPreview()}
                    </div>
                    
                        <div className='w-full'>
                            <Button placeholder='Save' onClick={handleSave} disabled={sumData.length === 4 || !applyForAll}/>
                        </div>
                    
                </div>
            }
            </div>
            
            <div className='flex flex-col p-8 gap-2'>
                <Input
                    type='text'
                    onChange={onChangeName}
                    label='Material Name'
                    value={name}
                    required={true}
                    disabled={!isEmpty(sumData)}
                />
                <Select
                    label='Apply For All Rotation ?'
                    value={applyForAll}
                    options={yesNoOptions}
                    onChange={handleChangeApplyForAll}
                    disabled={!isEmpty(sumData) || !width || !height || width !== height}
                    disabledPlaceholder={errorPlaceholderIdentical}
                />
                <Select
                    label='Set Rotation for Material'
                    value={rotation}
                    options={rotationOptions(sumData)}
                    onChange={onChangeRotation}
                    required={!applyForAll}
                    disabled={!!applyForAll}
                    disabledPlaceholder={['Applied to all rotations']}
                />
                <Select
                    label='Walkable ?'
                    value={walkable}
                    options={yesNoOptions}
                    onChange={onChangeWalkable}
                    required={true}
                    disabled={!isEmpty(sumData)}
                />
                <div className='flex flex-row gap-2'>
                    <Input
                        type='text'
                        onChange={onChangeDimensions('x')}
                        label='Width'
                        value={String(width)}
                        required={true}
                        maxLength={1}
                        disabled={true}
                    />
                    <Input
                        type='text'
                        onChange={onChangeDimensions('y')}
                        label='Height'
                        value={String(height)}
                        required={true}
                        maxLength={1}
                        disabled={true}
                    />
                </div>
                <Uploader onChange={onChangeFile} required={true} />
                <Button placeholder='Submit' onClick={onSubmit} disabled={disabledButton} />
            </div>
        </div>
    )
}

export default Material