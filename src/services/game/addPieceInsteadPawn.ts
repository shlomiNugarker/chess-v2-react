import * as _ from 'lodash'
import { GameState } from '../../models/GameState'

export function addPieceInsteadPawn(
  state: GameState,
  coordsToFill: {
    i: number
    j: number
  },
  pieceToAdd: string
) {
  const copiedState = _.cloneDeep(state)
  copiedState.board[coordsToFill.i][coordsToFill.j] = pieceToAdd
  return { newState: copiedState }
}
