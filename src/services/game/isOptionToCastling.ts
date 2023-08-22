import { GameState } from '../../models/GameState'

export function isOptionToCastling(
  state: GameState,
  pieceToCastling: string,
  selectedPieceCoord: {
    i: number
    j: number
  }
) {
  console.log('isOptionToCastling()')

  if (!state.selectedCellCoord) return false

  const currPiece = state.board[selectedPieceCoord.i][selectedPieceCoord.j]

  if (
    (pieceToCastling === state.pieces.KING_WHITE &&
      currPiece === state.pieces.ROOK_WHITE) ||
    (pieceToCastling === state.pieces.ROOK_WHITE &&
      currPiece === state.pieces.KING_WHITE) ||
    (pieceToCastling === state.pieces.KING_BLACK &&
      currPiece === state.pieces.ROOK_BLACK) ||
    (pieceToCastling === state.pieces.ROOK_BLACK &&
      currPiece === state.pieces.KING_BLACK)
  ) {
    return true
  }
  return false
}
