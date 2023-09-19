import { GameState } from '../../../models/GameState'
import { chess } from '.'

export function updateKingPos(
  state: GameState,
  toCoord: { i: number; j: number },
  piece: string
) {
  // console.log('updateKingPos()')
  if (piece === chess.gPieces.KING_WHITE) {
    state.kingPos.white = { i: toCoord.i, j: toCoord.j }
  }
  if (piece === chess.gPieces.KING_BLACK) {
    state.kingPos.black = { i: toCoord.i, j: toCoord.j }
  }
  return state
}
