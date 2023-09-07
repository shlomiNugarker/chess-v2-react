import { GameState } from '../../../models/GameState'
import { isColorPieceWorthCurrPlayerColor } from '../isColorPieceWorthCurrPlayerColor'
import { isEmptyCell } from '../isEmptyCell'

export function getAllPossibleCoordsPawn(
  state: GameState,
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  const { board } = state
  const res: { i: number; j: number }[] = []

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
    const nextLeftCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    const nextRightCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }

    if (
      board[nextLeftCoord.i][nextLeftCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(
        state,
        board[nextLeftCoord.i][nextLeftCoord.j]
      )
    ) {
      res.push(nextLeftCoord)
    }
    if (
      board[nextRightCoord.i][nextRightCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(
        state,
        board[nextRightCoord.i][nextRightCoord.j]
      )
    ) {
      res.push(nextRightCoord)
    }
  }
  if (!isWhite) {
    const nextLeftCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
    const nextRightCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }

    if (
      board[nextLeftCoord.i][nextLeftCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(
        state,
        board[nextLeftCoord.i][nextLeftCoord.j]
      )
    ) {
      res.push(nextLeftCoord)
    }
    if (
      board[nextRightCoord.i][nextRightCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(
        state,
        board[nextRightCoord.i][nextRightCoord.j]
      )
    ) {
      res.push(nextRightCoord)
    }
  }

  // Check if can eat cell after 2 steps of pawn:
  if (
    state.eatableCellAfterTwoStepsPawnWhite &&
    state.isBlackTurn &&
    pieceCoord.i === 4
  ) {
    const eatableCell = { ...state.eatableCellAfterTwoStepsPawnWhite }
    eatableCell.i = eatableCell.i + 1
    res.push(eatableCell)
  } else if (
    state.eatableCellAfterTwoStepsPawnBlack &&
    !state.isBlackTurn &&
    pieceCoord.i === 3
  ) {
    const eatableCell = { ...state.eatableCellAfterTwoStepsPawnBlack }
    eatableCell.i = eatableCell.i - 1
    res.push(eatableCell)
  }

  return res
}
