import { GameState } from '../../../models/GameState'
import { chess } from '.'

export function isColorPieceWorthCurrPlayerColor(
  state: GameState,
  piece: string
) {
  // console.log('isColorPieceWorthCurrPlayerColor()')
  return state.isBlackTurn === chess.isBlackPiece(state, piece)
}
