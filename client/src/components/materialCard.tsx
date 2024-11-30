import { MaterialInterface } from '../material/material'
import check from '../assets/checkmark.svg'
import cross from '../assets/crossmark.svg'

interface CardInterface {
    key: number
    material: MaterialInterface
    handleClickMaterial: (id: number) => (e: React.MouseEvent<HTMLDivElement>) => void
    selectedMaterialId: number
}

export const Card = (props: CardInterface) => {
    const { key, material, handleClickMaterial, selectedMaterialId } = props
    const { image_url, name, rotation, width, height, walkable, id = 0 } = material
    const classCard = selectedMaterialId === id ? 'bg-blue-300' : 'hover:bg-blue-300'
    return (
        <div
            key={key}
            className={`flex flex-col border border-black border-solid rounded-lg p-4 text-xs cursor-pointer ${classCard}`}
            onClick={handleClickMaterial(id)}
        >
            <img src={image_url as string} className='w-16 h-16' />
            <span>Name: {name}</span>
            <span>Rotation: {rotation}</span>
            <span>Width: {width}</span>
            <span>Height: {height}</span>
            <div className='flex flex-row'>
                <span>Walkable ? </span>
                <img src={walkable ? check : cross} width={16}/>
            </div>
        </div>
    )
}