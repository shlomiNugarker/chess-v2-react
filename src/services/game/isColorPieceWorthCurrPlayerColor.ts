import { GameState } from '../../models/GameState'
import { isBlackPiece } from './isBlackPiece'

export function isColorPieceWorthCurrPlayerColor(
  state: GameState,
  piece: string
) {
  return state.isBlackTurn === isBlackPiece(state, piece)
}
