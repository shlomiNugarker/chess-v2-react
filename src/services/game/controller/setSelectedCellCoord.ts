import { GameState } from '../../../models/GameState'
import { SetSelectedCellCoord } from '../../../models/SetSelectedCellCoord'

export const setSelectedCellCoord: SetSelectedCellCoord = ({
  cellCoord,
  gameState,
  updateGameState,
  setGameState,
}) => {
  if (!gameState) return
  const game = { ...gameState }
  game.selectedCellCoord = cellCoord
  updateGameState(game as GameState, setGameState)
}
