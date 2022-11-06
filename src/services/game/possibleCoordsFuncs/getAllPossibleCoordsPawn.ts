import { GameState } from '../../../features/game/gameSlice'
import { isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../main'

export function getAllPossibleCoordsPawn(
  state: GameState,
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  const { board } = state
  let res: { i: number; j: number }[] = []

  // Regular steps
  let diff = isWhite ? -1 : 1
  let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
  if (isEmptyCell(board, nextCoord)) {
    res.push(nextCoord)

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
      diff *= 2
      nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
      if (isEmptyCell(board, nextCoord)) res.push(nextCoord)
    }
  }

  // eatable cells:
  if (isWhite) {
    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    if (
      // if is there piece a & the piece is not mine
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(state, board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(state, board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  } else if (!isWhite) {
    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(state, board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(state, board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  }
  return res
}