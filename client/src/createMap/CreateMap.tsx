import { useState } from 'react'
import renderMap from '../utility/renderMap'

const CreateMap = () => {
    const [xLength, setXLength] = useState(0)
    const [yLength, setYLength] = useState(0)

    const handleChangePosition = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/
        const value = e.target.value
        if (type === 'x') {
            const regexValue = regex.test(value)
            if (regexValue) {
                setXLength(Number(value))
            }
        }
        if (type === 'y') {
            const regexValue = regex.test(value)
            if (regexValue) {
                setYLength(Number(value))
            }
        }
    }
    return (
        <div className='flex flex-row justify-between h-screen'>
            <div className='w-full'>
                <div className='w-fit m-auto'>
                    {renderMap({ map: [xLength, yLength], currentPosition: [] })}
                </div>
            </div>
            <div className='border border-black border-solid m-5 flex flex-col p-2 flex-end'>
                <div className='w-fit'>
                    <div>
                        <label htmlFor='pos-x'>X-length</label>
                    </div>
                    <div>
                        <input
                            className='border border-black border-solid rounded-sm p-2'
                            id='pos-x'
                            maxLength={2}
                            onChange={handleChangePosition('x')}
                            required
                            type='text'
                            value={xLength}
                        />
                    </div>
                </div>
                <div>
                <div className='w-fit'>
                        <label htmlFor='pos-y'>Y-length</label>
                    </div>
                    <div>
                    <input
                            className='border border-black border-solid rounded-sm p-2'
                            id='pos-y'
                            maxLength={2}
                            onChange={handleChangePosition('y')}
                            required
                            type='text'
                            value={yLength}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMap