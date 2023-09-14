import { GameState } from '../../../models/GameState'

export const setSelectedCellCoord = (
  cellCoord: { i: number; j: number },
  state: GameState
) => {
  console.log('setSelectedCellCoord()')
  const newState = { ...state }
  newState.selectedCellCoord = cellCoord
  return newState
}
