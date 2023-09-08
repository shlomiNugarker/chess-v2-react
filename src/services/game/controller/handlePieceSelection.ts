import { GameState } from '../../../models/GameState'
import { getPossibleCoords } from '../service/getPossibleCoords'
import { cleanBoard } from './cleanBoard'
import { markCells } from './markCells'

type Props = {
  target: Element
  gameState: GameState
  cellCoord: { i: number; j: number }
  piece: string
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void
}
export const handlePieceSelection = ({
  target,
  gameState,
  cellCoord,
  piece,
  setSelectedCellCoord,
}: Props) => {
  cleanBoard()
  if (gameState.board[cellCoord.i][cellCoord.j]) {
    target.classList.add('selected')
    setSelectedCellCoord(cellCoord)
    const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
    if (possibleCoords) markCells(gameState, possibleCoords)
  }
}
