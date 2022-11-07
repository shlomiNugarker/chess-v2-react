import { GameState } from '../../models/GameState'

export function updateKingPos(
  state: GameState,
  toCoord: { i: number; j: number },
  piece: string
) {
  if (piece === '♔') {
    state.kingPos.white = { i: toCoord.i, j: toCoord.j }
  }
  if (piece === '♚') {
    state.kingPos.black = { i: toCoord.i, j: toCoord.j }
  }
  return state
}
