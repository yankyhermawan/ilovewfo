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
    })
}

export default initSocket