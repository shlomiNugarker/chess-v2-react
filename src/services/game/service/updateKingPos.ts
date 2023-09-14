import { GameState } from '../../../models/GameState'
import { gPieces } from './gPieces'

export function updateKingPos(
  state: GameState,
  toCoord: { i: number; j: number },
  piece: string
) {
  // console.log('updateKingPos()')

  if (piece === gPieces.KING_WHITE) {
    state.kingPos.white = { i: toCoord.i, j: toCoord.j }
  }
  if (piece === gPieces.KING_BLACK) {
    state.kingPos.black = { i: toCoord.i, j: toCoord.j }
  }
  return state
}
