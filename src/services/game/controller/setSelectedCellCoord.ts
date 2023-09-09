import { GameState } from '../../../models/GameState'
import { SetSelectedCellCoordType } from '../../../models/SetSelectedCellCoord'

export const setSelectedCellCoord: SetSelectedCellCoordType = ({
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
