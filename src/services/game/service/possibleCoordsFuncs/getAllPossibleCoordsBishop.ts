import { GameState } from '../../../../models/GameState'
import { chess } from '..'

export function getAllPossibleCoordsBishop(
  state: GameState,
  pieceCoord: { i: number; j: number }
) {
  // console.log('getAllPossibleCoordsBishop()')
  const { board } = state

  const possibleDirections = [
    { i: 1, j: -1 }, // bottomLeft
    { i: 1, j: 1 }, // bottomRight
    { i: -1, j: -1 }, // topLeft
    { i: -1, j: 1 }, // topRight
  ]

  const possibleCoords: { i: number; j: number }[] = []

  for (const direction of possibleDirections) {
    for (let distance = 1; distance <= 8; distance++) {
      const diffI = distance * direction.i
      const diffJ = distance * direction.j

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

      if (chess.isEmptyCell(board, nextCoord, state.pieces)) {
        possibleCoords.push(nextCoord)
      } else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!chess.isColorPieceWorthCurrPlayerColor(state, piece)) {
          possibleCoords.push(nextCoord) // last coord -> eatable
        }
        break
      }
    }
  }

  return possibleCoords
}
