import { GameState } from '../../../models/GameState'
import { SetSelectedCellCoordType } from '../../../models/SetSelectedCellCoord'
import { UpdateGameState } from '../../../models/UpdateGameState'
import { getPossibleCoords } from '../service/getPossibleCoords'
import { cleanBoard } from './cleanBoard'
import { markCells } from './markCells'

type Props = {
  target: Element
  gameState: GameState
  cellCoord: { i: number; j: number }
  piece: string
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  updateGameState: UpdateGameState
  setSelectedCellCoord: SetSelectedCellCoordType
}
export const handlePieceSelection = ({
  target,
  gameState,
  cellCoord,
  piece,
  setGameState,
  updateGameState,
  setSelectedCellCoord,
}: Props) => {
  cleanBoard()
  console.log('handlePieceSelection()')
  if (gameState.board[cellCoord.i][cellCoord.j]) {
    target.classList.add('selected')
    setSelectedCellCoord({
      cellCoord,
      gameState,
      updateGameState,
      setGameState,
    })
    const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
    if (possibleCoords) markCells(gameState, possibleCoords)
  }
}
