import { GameState } from '../../../features/game/gameSlice'
import { isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../main'

export function getAllPossibleCoordsBishop(
  state: GameState,
  pieceCoord: {
    i: number
    j: number
  }
) {
  const { board } = state

  let res: { i: number; j: number }[] = []

  const possibleDir = [
    { i: 1, j: -1 }, //bottomLeft
    { i: 1, j: 1 }, //bottomRight
    { i: -1, j: -1 }, //topLeft
    { i: -1, j: 1 }, //topRight
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j

      const nextCoord = {
        i: pieceCoord.i + diffI,
        j: pieceCoord.j - diffJ,
      }
      if (
        nextCoord.i > 7 ||
        nextCoord.i < 0 ||
        nextCoord.j > 7 ||
        nextCoord.j < 0
      ) {
        break
      }

      if (isEmptyCell(board, nextCoord)) {
        res.push(nextCoord)
      } else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(state, piece)) res.push(nextCoord) //last coord -> eatable
        break
      }
    }
  }
  return res
}
