import { GameState } from '../../../models/GameState'
import { gameStateService } from '../../gameStateService'
import { storageService } from '../../storageService'

export const getState = async (
  gameId: string,
  setGameState: (value: React.SetStateAction<GameState | null>) => void
) => {
  if (gameId && gameId.length > 10) {
    const state = await gameStateService.getById(gameId)
    setGameState(state)
    return state
  }

  if (gameId && gameId.length < 10) {
    const stateFromStorage = storageService.get('chess-game', gameId)
    if (stateFromStorage) setGameState(stateFromStorage)
  }
}
