import _ from 'lodash'
import { GameState } from '../../../models/GameState'
import { gameStateService } from '../../gameStateService'
import { socketService } from '../../socketService'
import { storageService } from '../../storageService'
import { UpdateGameState } from '../../../models/UpdateGameState'

export const updateGameState: UpdateGameState = async (
  newState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => {
  const stateWithBoardHistory = _.cloneDeep(newState)

  if (newState?.board) stateWithBoardHistory.boardHistory.push(newState.board)

  if (!stateWithBoardHistory.isOnline) {
    storageService.put('chess-game', stateWithBoardHistory)

    setGameState(stateWithBoardHistory)
  } else {
    const savedState = await gameStateService.saveState(stateWithBoardHistory)
    socketService.emit('state-updated', savedState)
    setGameState((prev) => ({
      ...prev,
      ...savedState,
    }))
  }
}
