import { GameState } from '../../features/game/gameSlice'
import { isBlackPiece } from './isBlackPiece'

export function isColorPieceWorthCurrPlayerColor(
  state: GameState,
  piece: string
) {
  return state.isBlackTurn === isBlackPiece(state, piece)
}
