import { GameState } from '../../../../models/GameState'
import { chess } from '..'

export function getAllPossibleCoordsKing(
  state: GameState,
  pieceCoord: { i: number; j: number }
) {
  // console.log('getAllPossibleCoordsKing()')
  const { board, isBlackTurn, isCastlingLegal } = state
  const { i: pieceI, j: pieceJ } = pieceCoord
  const possibleSteps = [
    { i: -1, j: 0 },
    { i: 0, j: 1 },
    { i: -1, j: 1 },
    { i: -1, j: -1 },
    { i: 0, j: -1 },
    { i: 1, j: 0 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]

  const possibleCoords: { i: number; j: number }[] = []

  for (const step of possibleSteps) {
    const nextCoord = {
      i: pieceI + step.i,
      j: pieceJ + step.j,
    }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (chess.isEmptyCell(board, nextCoord, state.pieces)) {
        possibleCoords.push(nextCoord)
      } else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!chess.isColorPieceWorthCurrPlayerColor(state, piece)) {
          possibleCoords.push(nextCoord) // push eatable coord
        }
      }
    }
  }

  // Castling Coord:
  const castlingCoord: { i: number; j: number } = isBlackTurn
    ? { i: 0, j: 4 }
    : { i: 7, j: 4 }

  if (isCastlingLegal[isBlackTurn ? 'blackKing' : 'whiteKing']) {
    for (const direction of [1, -1]) {
      const targetColumn = direction === 1 ? 7 : 0
      if (
        chess.isEmptyCell(
          board,
          { i: castlingCoord.i, j: targetColumn },
          state.pieces
        )
      ) {
        const rookColumn = direction === 1 ? 7 : 0
        const coordForCastle = { i: castlingCoord.i, j: rookColumn }

        if (
          chess.isColorPieceWorthCurrPlayerColor(
            state,
            board[coordForCastle.i][coordForCastle.j]
          )
        ) {
          possibleCoords.push(coordForCastle)
        }
      }
    }
  }

  return possibleCoords
}
