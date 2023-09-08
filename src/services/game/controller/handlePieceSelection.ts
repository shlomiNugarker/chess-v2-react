import { GameState } from '../../../models/GameState'
import { getPossibleCoords } from '../getPossibleCoords'
import { cleanBoard } from './cleanBoard'
import { markCells } from './markCells'

export const handlePieceSelection = (
  target: Element,
  gameState: GameState,
  cellCoord: { i: number; j: number },
  piece: string,
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void
) => {
  cleanBoard()
  if (gameState.board[cellCoord.i][cellCoord.j]) {
    target.classList.add('selected')
    setSelectedCellCoord(cellCoord)
    const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
    if (possibleCoords) markCells(gameState, possibleCoords)
  }
}
