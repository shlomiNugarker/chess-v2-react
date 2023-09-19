import { GameState } from '../../../models/GameState'
import { chess } from '.'

export function addPieceInsteadPawn(
  state: GameState,
  coordsToFill: {
    i: number
    j: number
  },
  pieceToAdd: string
) {
  // console.log('addPieceInsteadPawn()')
  const copiedState = chess.cloneDeep(state)
  copiedState.board[coordsToFill.i][coordsToFill.j] = pieceToAdd
  return { newState: copiedState }
}
