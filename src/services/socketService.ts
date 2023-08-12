import { DefaultEventsMap } from '@socket.io/component-emitter'
import io, { Socket } from 'socket.io-client'

export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null
  const socketService = {
    async setup() {
      socket = io(baseUrl)
    },
    on(eventName: any, cb: any) {
      socket && socket.on(eventName, cb)
    },
    off(eventName: any, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName: any, data: any) {
      socket && socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
