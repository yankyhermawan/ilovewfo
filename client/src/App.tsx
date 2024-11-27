import { useState, useEffect } from 'react'
import './output.css'
import person from './assets/person-solid.svg'
import table from './assets/table.jpg'

const dummyMap = [
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1]
]

const properties = [
	{
		id: 1,
		name: 'table',
		position: [3, 2],
		rotation: 0,
		width: 1,
		height: 1,
		src: table
	},
	{
		id: 1,
		name: 'table',
		position: [4, 2],
		rotation: 0,
		width: 1,
		height: 1,
		src: table
	}
]


function App() {
	const [currentPosition, setCurrentPosition] = useState([1, 1])

	const eventListener = (dir = '') => {
		if (dir === 'up') {
			if (currentPosition[0] - 1 >= 0 && dummyMap[currentPosition[0] - 1][currentPosition[1]]) {
				setCurrentPosition([currentPosition[0] - 1, currentPosition[1]])
			}
		}
		if (dir === 'down') {
			if (currentPosition[0] + 1 <= dummyMap.length && dummyMap[currentPosition[0] + 1][currentPosition[1]]) {
				setCurrentPosition([currentPosition[0] + 1, currentPosition[1]])
			}
		}
		if (dir === 'left') {
			if (dummyMap[currentPosition[0]][currentPosition[1] - 1] && currentPosition[1] - 1 >= 0) {
				setCurrentPosition([currentPosition[0], currentPosition[1] - 1])
			}
		}
		if (dir === 'right') {
			if (dummyMap[currentPosition[0]][currentPosition[1] + 1] && currentPosition[1] + 1 <= dummyMap[currentPosition[1]].length) {
				setCurrentPosition([currentPosition[0], currentPosition[1] + 1])
			}
		}
	}

	const renderSquare = () => {
		return dummyMap.map((dt, i) => {
			const res = []
			for (let j = 0; j <= dt.length; j++) {
				const name = (i+j) % 2 === 0 ? 'bg-red-400' : 'bg-blue-400'
				const img = i === currentPosition[0] && j === currentPosition[1] ? <img src={person} width={24} height={24}/> : <></>
				res.push(
					<div className={`flex ${name} w-16 h-16 justify-center`}>
						{img}
					</div>
				) 
			}
			return (
				<div className='flex flex-row'>
					{res}
				</div>
			)
		})
	}

	const renderProperties = () => {
		return properties.map(prop => {
			const offsetX = prop.position[0] * 64
			const offsetY = prop.position[1] * 64
			const width = prop.width * 64
			const height = prop.height * 64

			return (
				<div className='absolute' style={{ marginLeft: `${offsetX}px`, marginTop: `${offsetY}px` }}>
					<img src={prop.src} width={width} height={height} />
				</div>
			)
		})
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (e.code === 'KeyW' || e.code === 'ArrowUp') {
				e.preventDefault()
				eventListener('up')
		}
			if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
				e.preventDefault()
				eventListener('left')
			}
			if (e.code === 'KeyS' || e.code === 'ArrowDown') {
				e.preventDefault()
				eventListener('down')
			}
			if (e.code === 'KeyD' || e.code === 'ArrowRight') {
				e.preventDefault()
				eventListener('right')
			}
		};
	  
		window.addEventListener('keydown', handleKeyDown);
		return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		};
	  }, [currentPosition]);
	  

	return (
	<div className='flex flex-col'>
		{renderSquare()}
		{renderProperties()}
	</div>
	)
}

export default App
