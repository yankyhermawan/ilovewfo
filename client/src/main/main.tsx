import { useEffect, useState } from 'react'
import person from '../assets/person-solid.svg'
import table from '../assets/table.jpg'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import renderMap from '../utility/renderMap'

const dummyMap = [9, 16]

const properties = [
	{
		id: 1,
		name: 'table',
		position: [3, 2],
		rotation: 0,
		width: 1,
		height: 1,
		src: table,
		walkable: false
	},
	{
		id: 1,
		name: 'table',
		position: [4, 2],
		rotation: 0,
		width: 1,
		height: 1,
		src: table,
		walkable: false
	}
]


function Main() {
	const [currentPosition, setCurrentPosition] = useState<number[]>([1, 1])
	const [rotation, setRotation] = useState<number>(0)
	const isAbleToMove = (nextPosition: number[]) => {
		return isEmpty(filter(properties, dt => isEqual(dt.position, nextPosition) && !dt.walkable))
	}

	const walk = (dir = '') => {
		if (dir === 'up') {
			const nextPosition = [currentPosition[0], currentPosition[1] - 1]
			if (nextPosition[1] >= 0
				&& isAbleToMove(nextPosition)
			) {
				console.log(nextPosition)
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'down') {
			const nextPosition = [currentPosition[0], currentPosition[1] + 1]
			if (currentPosition[1] + 1 < dummyMap[1]
				&& isAbleToMove(nextPosition)
			) {
				console.log(nextPosition)
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'left') {
			const nextPosition = [currentPosition[0] - 1, currentPosition[1]]
			if (currentPosition[0] - 1 >= 0
				&& isAbleToMove(nextPosition)
			) {
				console.log(nextPosition)
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'right') {
			const nextPosition = [currentPosition[0] + 1, currentPosition[1]]
			if (nextPosition[0] < dummyMap[0]
				&& isAbleToMove(nextPosition)
			) {
				console.log(nextPosition)
				setCurrentPosition(nextPosition)
			}
		}
	}

	const renderProperties = () => {
		return properties.map((prop, key) => {
			const offsetX = prop.position[0] * 64
			const offsetY = prop.position[1] * 64
			const width = prop.width * 64
			const height = prop.height * 64

			return (
				<div className='absolute' key={key} style={{ marginLeft: `${offsetX}px`, marginTop: `${offsetY}px` }}>
					<img src={prop.src} width={width} height={height} />
				</div>
			)
		})
	}

	useEffect(() => {
		let timeoutId: number | null = null
		const handleKeyDown = (e: KeyboardEvent): void => {
			const keyAction = {
				KeyW: 'up',
				ArrowUp: 'up',
				KeyA: 'left',
				ArrowLeft: 'left',
				KeyS: 'down',
				ArrowDown: 'down',
				KeyD: 'right',
				ArrowRight: 'right'
			}
			const rotation = {
				right: 0,
				up: 90,
				left: 180,
				down: 270
			}
			const key = e.code
			if (key in keyAction) {
				e.preventDefault()
				const direction = keyAction[key as keyof typeof keyAction]
				setRotation(rotation[direction as keyof typeof rotation])
				timeoutId = setTimeout(() => {
					walk(direction)
				}, 50, 'abc')
			}
		}

		const handleKeyUp = (): void => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				timeoutId = null
			}
		}
	  
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		};
	}, [currentPosition])	  

	return (
		<div className='flex flex-col'>
			{renderMap({ map: dummyMap, currentPosition })}
			{renderProperties()}
		</div>
	)
}

export default Main
