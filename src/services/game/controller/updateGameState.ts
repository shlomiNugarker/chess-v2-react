import { GameState } from '../../../models/GameState'
import { gameStateService } from '../../gameStateService'
import { socketService } from '../../socketService'
import { storageService } from '../../storageService'
import { UpdateGameState } from '../../../models/UpdateGameState'

export const updateGameState: UpdateGameState = async (
  newState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => {
  if (!newState.isOnline) {
    storageService.put('chess-game', newState)
    setGameState(newState)
  } else {
    const savedState = await gameStateService.saveState(newState)
    socketService.emit('state-updated', savedState)
    setGameState((prev) => ({
      ...prev,
      ...savedState,
    }))
  }
}
