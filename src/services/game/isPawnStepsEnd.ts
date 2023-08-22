import { GameState } from '../../models/GameState'

export function isPawnStepsEnd(
  state: GameState,
  coord: { i: number; j: number }
) {
  console.log('isPawnStepsEnd()')

  const piece = state.board[coord.i][coord.j]
  if (piece === state.pieces.PAWN_BLACK && state.isBlackTurn && coord.i === 7) {
    return true
  } else if (
    piece === state.pieces.PAWN_WHITE &&
    !state.isBlackTurn &&
    coord.i === 0
  ) {
    return true
  }
  return false
}
