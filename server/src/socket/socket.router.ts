import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'

const initSocket = (server: httpServer) => {
    const io = new Server(server, {
        cors: {
			origin: '*',
			methods: ["GET", "POST"]
		}
    })

    io.on('connection', (socket: Socket) => {
        socket.on('hello', () => console.log('hello'))

        socket.on('join_room', ({ room_id, user_id }) => {
            socket.join(room_id)
            socket.broadcast.to(room_id).emit('join_room', `user id: ${user_id} has joined`)
        })

        socket.on('chat', ({ sender_id, message, room_id, time }) => {
            io.to(room_id).emit('chat', { sender_id, message, time })
        })

        socket.on('audioStream', ({ room_id, file, sender_id }) => {
            const audioBuffer = Buffer.from(new Uint8Array(file))
            socket.broadcast.to(room_id).emit('audioStream', { sender_id, file: audioBuffer })
        })
    })
}

export default initSocket