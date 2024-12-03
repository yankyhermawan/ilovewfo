import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'

const initSocket = (server: httpServer) => {
    const io = new Server(server, {
        cors: {
			origin: true,
			methods: ["GET", "POST"],
			credentials: true,
		}
    })

    io.on('connection', (socket: Socket) => {
        socket.on('hello', () => console.log('hello'))

        socket.on('join_room', ({ room_id, user_id }) => {
            socket.join(room_id)
            socket.broadcast.to(room_id).emit('join_room', `user id: ${user_id} has joined`)
        })

        socket.on('chat', ({ sender_id, message, room_id }) => {
            io.to(room_id).emit('chat', { sender_id, message })
        })
    })
}

export default initSocket