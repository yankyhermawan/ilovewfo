import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import UserAuth from '../user/user.auth'

const userAuth = new UserAuth()

const initSocket = (server: httpServer) => {
    const io = new Server(server, {
        cors: {
			origin: '*',
			methods: ["GET", "POST"]
		}
    })

    io.on('connection', (socket: Socket) => {
        socket.on('hello', () => console.log('hello'))

        socket.on('join_room', data => {
            const { room_id, id } = data
            socket.join(room_id)
            userAuth.setLogin(id)
            io.to(room_id).emit('join_room', { ...data })
        })

        socket.on('chat', ({ sender_id, message, room_id, time }) => {
            io.to(room_id).emit('chat', { sender_id, message, time })
        })

        socket.on('audioStream', ({ room_id, file, sender_id }) => {
            const audioBuffer = Buffer.from(new Uint8Array(file))
            socket.broadcast.to(room_id).emit('audioStream', { sender_id, file: audioBuffer })
        })

        socket.on('disconnected', ({ user_id, room_id }) => {
            userAuth.logout(user_id)
            io.to(room_id).emit('disconnected', user_id)
        })
    })
}

export default initSocket