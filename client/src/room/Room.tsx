import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import person from '../assets/person-solid.svg'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import renderMap from './renderMap'
import find from 'lodash/find'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import { io } from 'socket.io-client'
import { getMyData, getUsers } from '../login/actions'
import { useEffectAfterMount } from '../utility/customHooks'
import Input from '../components/Input/Input'
import send from '../assets/send.svg'
import BubbleChat from '../components/BubbleChat'
import moment from 'moment'
import micOn from '../assets/microphone.svg'
import micOff from '../assets/mic-mute.svg'
import { endpoint } from '../utility/constants'
import { MaterialInterfaceWithPosition, myData, chat, RenderRoomMaterialInterface, RoomInterface } from './interface'
import UserOnline from './UserOnline'
import { getRoom } from './action'
import { maxBy } from 'lodash'

const dummyMap = [9, 16]

function Room() {
	const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0])
	const [rotation, setRotation] = useState<number>(0)
	const [materials, setMaterials] = useState<RenderRoomMaterialInterface[]>([])
	const [mapSize, setMapSize] = useState<[number, number]>([0, 0])
	const [myData, setMyData] = useState<Partial<myData>>({})
	const [message, setMessage] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [allMessage, setAllMessage] = useState<chat[]>([])
	const [allUsers, setAllUsers] = useState<myData[]>([])
	const [isMicOn, setIsMicOn] = useState(false)
	const [allUsersInRoom, setAllUsersInRoom] = useState<myData[]>([])
	const { id: room_id } = useParams()
	const socket = io(endpoint)
	const isAbleToMove = (nextPosition: number[]) => {
		return isEmpty(filter(materials, dt => isEqual([dt.position_y, dt.position_x], nextPosition[1]) && !dt.walkable))
	}

	const walk = (dir = '') => {
		if (dir === 'down') {
			const nextPosition: [number, number] = [currentPosition[0], currentPosition[1] - 1]
			if (nextPosition[1] >= 0
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'up') {
			const nextPosition: [number, number] = [currentPosition[0], currentPosition[1] + 1]
			if (currentPosition[1] + 1 < dummyMap[1]
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'left') {
			const nextPosition: [number, number] = [currentPosition[0] - 1, currentPosition[1]]
			if (currentPosition[0] - 1 >= 0
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
		if (dir === 'right') {
			const nextPosition: [number, number] = [currentPosition[0] + 1, currentPosition[1]]
			if (nextPosition[0] < dummyMap[0]
				&& isAbleToMove(nextPosition)
			) {
				setCurrentPosition(nextPosition)
			}
		}
	}

	useEffect(() => {
		const getData = async () => {
			const res = await getRoom(Number(room_id))
			const resData: RoomInterface = res.data
			const { room_material = [], name, entry_point_x, entry_point_y } = resData
			const orderedByPosition = orderBy(room_material, ['position_x', 'position_y'], ['desc', 'desc'])
			const maxX = orderedByPosition[0].position_x + 1
			const maxY = orderedByPosition[0].position_y + 1
			setMapSize([maxX, maxY])
			setCurrentPosition([entry_point_x, entry_point_y])
			const roomMaterial = map(room_material, dt => {
				const { material, position_x, position_y } = dt
				const { image_url, height, width, rotation, walkable } = material
				return ({
					name,
					position_x,
					position_y,
					image_url,
					height,
					width,
					rotation,
					walkable
				})
			})
			setMaterials(roomMaterial)
		}
		const getMe = async () => {
			const res = await getMyData()
			setMyData(res.data)
		}

		const getAllUsers = async () => {
			const res = await getUsers({ room_id: Number(room_id), is_logged_in: 1 })
			setAllUsers(res.data)
			setAllUsersInRoom(res.data)
		}
		getData()
		getMe()
		getAllUsers()
	}, [])

	useEffectAfterMount(() => {
		if (myData) {
			socket.emit('join_room', { ...myData })
		}
	}, [myData])

	useEffect(() => {
		socket.on('join_room', dt => setAllUsersInRoom(prevState => orderBy(uniqBy([...prevState, dt], 'id'), 'name')))
		socket.on('chat', ({ sender_id, message, time }) => {
			setAllMessage(prevState => [{ sender_id, message, time }, ...prevState])
		})
		socket.on('audioStream', ({ file, sender_id }) => {
			if (sender_id === myData.id) return
			const blob = new Blob([file], { type: 'audio/ogg' })
			const audioUrl = URL.createObjectURL(blob)
			const audio = new Audio(audioUrl)

			if (!audio) {
				return
			}
			audio.volume = 0.25
			audio.play()
		})

		socket.on('disconnected', user_id => {
			setAllUsersInRoom(prevState => filter(prevState, dt => dt.id !== user_id))
		})
	}, [socket])

	useEffect(() => {
		const handleBeforeUnload = () => {
			socket.emit('disconnected', { user_id: myData.id, room_id: myData.room_id })
		}

		window.addEventListener('unload', handleBeforeUnload)

		return (() => {
			window.removeEventListener('unload', handleBeforeUnload)
		})
	}, [socket, myData.id])

	useEffect(() => {
		let mediaRecorder: MediaRecorder | null = null
		let stream: MediaStream | null = null

		if (isMicOn) {
			navigator.mediaDevices.getUserMedia({ audio: {
				autoGainControl: true,
				channelCount: 2,
				sampleRate: 96000,
				sampleSize: 16,
				echoCancellation: true,
				noiseSuppression: true
			}})
				.then((userStream) => {
					stream = userStream
					mediaRecorder = new MediaRecorder(userStream)
					const audioChunks: Blob[] = []
	
					mediaRecorder.addEventListener('dataavailable', (event) => {
						audioChunks.push(event.data)
					})
	
					mediaRecorder.addEventListener('stop', () => {
						const audioBlob = new Blob(audioChunks)
						audioChunks.length = 0
	
						const fileReader = new FileReader()
						fileReader.readAsArrayBuffer(audioBlob)
	
						fileReader.onloadend = () => {
							const arrayBuffer = fileReader.result
							if (isMicOn) {
								socket.emit('audioStream', {
									room_id: myData.room_id,
									file: arrayBuffer,
									sender_id: myData.id
								})
							}
						}
					})
	
					mediaRecorder.start(10)
					const interval = setInterval(() => {
						if (mediaRecorder && mediaRecorder.state === 'recording') {
							mediaRecorder.stop()
							mediaRecorder.start(10)
						}
					}, 1000)
	
					// Cleanup interval and mediaRecorder on stop
					return () => {
						clearInterval(interval)
						if (mediaRecorder && mediaRecorder.state !== 'inactive') {
							mediaRecorder.stop()
						}
						if (stream) {
							stream.getTracks().forEach((track) => track.stop())
						}
					}
				})
				.catch((error) => {
					console.error("Error accessing microphone:", error)
				})
		}
	
		// Cleanup on unmount or when isMicOn changes
		return () => {
			if (mediaRecorder && mediaRecorder.state !== 'inactive') {
				mediaRecorder.stop()
			}
			if (stream) {
				stream.getTracks().forEach((track) => track.stop())
			}
		}
	}, [isMicOn, socket, myData.room_id])

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
		}
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
			socket.emit('chat', { room_id: myData.room_id, sender_id: myData.id, message, time: moment().utc().format('YYYY-MM-DD HH:mm:ss') })
			setMessage('')
		}
	}

	const renderChat = () => {
		return map(allMessage, (dt, key) => {
			const { sender_id, message, time } = dt
			const senderName = find(allUsers, dt => dt.id === sender_id)?.name || ''
			const isMe = sender_id === myData.id
			return (
				<div key={key}>
					<BubbleChat sender={senderName} message={message} time={time} isMe={isMe} />
				</div>
			)
		})
	}

	return (
		<div className='w-screen h-screen flex flex-row justify-center'>
			<div className='absolute w-48 bg-black/50 top-0 left-0 flex flex-col justify-start p-4 gap-4'>
				<div>User in this room</div>
				<UserOnline data={allUsersInRoom} />
			</div>
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col'>
					{renderMap({ size: mapSize, userPosition: [{ id: 1, x: currentPosition[0], y: currentPosition[1], src: person }], materials })}
				</div>
				<div
					className={`w-fit h-max p-4 border border-black border-solid rounded-full ${isMicOn ? 'bg-blue-400/75' : 'bg-red-300'}`}
					onClick={() => setIsMicOn(prevState => !prevState)}
				>
					<img src={isMicOn ? micOn : micOff} width={75}/>
				</div>
			</div>
			<div className='absolute w-96 h-screen bg-gray-300 top-0 right-0 p-8 flex flex-col justify-end'>
				<div className='flex flex-col-reverse overflow-y-auto mb-4 gap-2'>
					{renderChat()}
				</div>
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
		</div>
		
	)
}

export default Room
