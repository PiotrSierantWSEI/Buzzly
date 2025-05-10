import mitt from 'mitt'

type Events = {
  logout: void
}

const emitter = mitt<Events>()

export const onLogoutEvent = (handler: () => void): (() => void) => {
  emitter.on('logout', handler)
  return () => {
    emitter.off('logout', handler)
  }
}

export const triggerLogoutEvent = () => {
  emitter.emit('logout')
}