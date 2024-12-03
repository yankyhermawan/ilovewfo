import { useEffect, useState } from 'react'
import person from '../assets/person-solid.svg'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import renderMap from './renderMap'
import { io } from 'socket.io-client'
import { getCompanyMaterials } from '../material/action'
import { MaterialInterface } from '../material/material'
import { map } from 'lodash'
import { getMyData } from '../login/actions'
import { useEffectAfterMount } from '../utility/customHooks'
import { Input } from '../components/input'
import send from '../assets/send.svg'

interface MaterialInterfaceWithPosition extends MaterialInterface {
	position_x: number
	position_y: number
}

interface MaterialResponse extends MaterialInterface {
	company_material: {
		position_x: number
		position_y: number
	}[]
}

interface myData {
	id: number | null
	room_id: number | null
}

interface chat {
	sender_id: number
	message: string
}

const dummyMap = [9, 16]


function Main() {
	const [currentPosition, setCurrentPosition] = useState<number[]>([1, 1])
	const [rotation, setRotation] = useState<number>(0)
	const [materials, setMaterials] = useState<MaterialInterfaceWithPosition[]>([])
	const [myData, setMyData] = useState<Partial<myData>>({})
	const [message, setMessage] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [allMessage, setAllMessage] = useState<chat[]>([])
	const socket = io(':3000')
	const isAbleToMove = (nextPosition: number[]) => {
		return isEmpty(filter(materials, dt => isEqual([dt.position_y, dt.position_x], nextPosition[1]) && !dt.walkable))
	}

	const walk = (dir = '') => {
		if (dir === 'up') {
			const nextPosition = [currentPosition[0], currentPosition[1] - 1]
			if (nextPosition[1] >= 0
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'down') {
			const nextPosition = [currentPosition[0], currentPosition[1] + 1]
			if (currentPosition[1] + 1 < dummyMap[1]
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'left') {
			const nextPosition = [currentPosition[0] - 1, currentPosition[1]]
			if (currentPosition[0] - 1 >= 0
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'right') {
			const nextPosition = [currentPosition[0] + 1, currentPosition[1]]
			if (nextPosition[0] < dummyMap[0]
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
	}

	useEffect(() => {
		const getData = async () => {
			const res = await getCompanyMaterials({ id: 1 })
			const resData: MaterialResponse[] = res.data
			const materialRes: MaterialInterfaceWithPosition[] = []
			map(resData, dt => {
				const { company_material, image_url, height, width, walkable, name, rotation, is_identical } = dt
				map(company_material, mat => {
					materialRes.push({
						name,
						rotation,
						is_identical,
						image_url,
						height,
						width,
						walkable,
						position_x: mat.position_x,
						position_y: mat.position_y
					})
				})
			})
			setMaterials(materialRes)
		}
		const getMe = async () => {
			const res = await getMyData()
			setMyData(res.data)
		}
		getData()
		getMe()
	}, [])

	useEffectAfterMount(() => {
		if (myData) {
			socket.emit('join_room', { room_id: myData.room_id, user_id: myData.id })
		}
	}, [myData])

	useEffect(() => {
		socket.on('join_room', (dt) => console.log(dt))
		socket.on('chat', ({ sender_id, message }) => {
			setAllMessage(prevState => [...prevState, { sender_id, message }])
		})
	}, [socket])

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

		if (!isTyping) {
			window.addEventListener('keydown', handleKeyDown)
			window.addEventListener('keyup', handleKeyUp)
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		};
	}, [currentPosition, isTyping])

	useEffectAfterMount(() => {
		if (isTyping && message) {
			const listener = (e: KeyboardEvent) => {
				if (e.code === 'Enter') {
					handleSendMessage()
					window.removeEventListener('keydown', listener)
				} 
				window.removeEventListener('keydown', listener)
			}
			window.addEventListener('keydown', listener)
		}
	}, [isTyping, message])

	const handleSendMessage = () => {
		if (message !== '' && myData) {
			socket.emit('chat', { room_id: myData.room_id, sender_id: myData.id, message })
			setMessage('')
		}
	}

	const renderChat = () => {
		return map(allMessage, (dt, key) => {
			const { sender_id, message } = dt
			return (
				<div key={key}>
					{message}
				</div>
			)
		})
	}

	return (
		<>
			<div className='flex flex-col w-screen h-screen'>
				{renderMap({ size: [5, 5], userPosition: [{ id: 1, x: 2, y: 3, src: person }], materials })}
			</div>
			<div className='absolute w-96 h-screen bg-gray-300 top-0 right-0 p-8 flex flex-col justify-end'>
				{renderChat()}
				<div className='flex flex-row justify-between gap-4 items-center'>
					<Input
						placeholder='Input message here'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
						onFocus={() => setIsTyping(true)}
						onBlur={() => setIsTyping(false)}
						value={message}/>
					<div className='h-full flex items-center' onClick={handleSendMessage}>
						<img src={send} width={24} height={24} className='h-fit'/>
					</div>
				</div>
			</div>
		</>
		
	)
}

export default Main
