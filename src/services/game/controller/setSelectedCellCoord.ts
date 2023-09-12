// import { GameState } from '../../../models/GameState'
import { SetSelectedCellCoordType } from '../../../models/SetSelectedCellCoord'

export const setSelectedCellCoord: SetSelectedCellCoordType = ({
  cellCoord,
  gameState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateGameState,
  setGameState,
}) => {
  console.log('setSelectedCellCoord()')

  if (!gameState) return
  const game = { ...gameState }
  game.selectedCellCoord = cellCoord
  setGameState(game)
  // updateGameState(game as GameState, setGameState)
}
