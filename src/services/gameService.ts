import { httpService } from './httpService'

export const postService = {
  getById,
  startNewGameOffline,
}

async function startNewGameOffline() {
  return await httpService.get(`game/offline`)
}

async function getById(id: string) {
  return await httpService.get(`game/${id}`)
}
