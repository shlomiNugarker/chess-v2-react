import { GameState } from '../../models/GameState'

export function isBlackPiece(
  state: GameState,
  piece: string
): boolean | undefined {
  switch (piece) {
    case state.pieces.KING_WHITE:
    case state.pieces.BISHOP_WHITE:
    case state.pieces.PAWN_WHITE:
    case state.pieces.QUEEN_WHITE:
    case state.pieces.ROOK_WHITE:
    case state.pieces.KNIGHT_WHITE:
      return false

    case state.pieces.KING_BLACK:
    case state.pieces.BISHOP_BLACK:
    case state.pieces.PAWN_BLACK:
    case state.pieces.QUEEN_BLACK:
    case state.pieces.ROOK_BLACK:
    case state.pieces.KNIGHT_BLACK:
      return true

    default:
      return undefined
  }
}
