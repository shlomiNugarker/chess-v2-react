import { GameState } from '../../features/game/gameSlice'

export function isBlackPiece(
  state: GameState,
  piece: string
): boolean | undefined {
  switch (piece) {
    case state.pieces.KING_WHITE:
      return false

    case state.pieces.BISHOP_WHITE:
      return false

    case state.pieces.PAWN_WHITE:
      return false

    case state.pieces.QUEEN_WHITE:
      return false

    case state.pieces.ROOK_WHITE:
      return false

    case state.pieces.KNIGHT_WHITE:
      return false

    case state.pieces.KING_BLACK:
      return true

    case state.pieces.BISHOP_BLACK:
      return true

    case state.pieces.PAWN_BLACK:
      return true

    case state.pieces.QUEEN_BLACK:
      return true

    case state.pieces.ROOK_BLACK:
      return true

    case state.pieces.KNIGHT_BLACK:
      return true

    default:
      return undefined
  }
}
