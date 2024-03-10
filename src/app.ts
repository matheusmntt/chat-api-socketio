import express from 'express'
import { Server, createServer } from 'http'
import { Server as IO } from 'socket.io'

class App {
  public app: express.Application
  public server: Server
  private socketIo: IO

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.socketIo = new IO(this.server, {
      cors: {
        origin: '*'
      }
    })

    this.socketIo.on('connection', (socket) => {
      console.log('teste2')

      socket.on('disconnect', () => {
        console.log('disconnect')
      })

      socket.on('message', (message) => {
        socket.broadcast.emit('message', message) // -> envia pra todo mundo, exceto o emissor
        // this.socketIo.emit('message', message) -> envia pra todo mundo, incluindo o emissor 
      })
    })
  }
}

export { App } 