import * as _ from 'lodash'
import { GameState } from '../../../models/GameState'

export function addPieceInsteadPawn(
  state: GameState,
  coordsToFill: {
    i: number
    j: number
  },
  pieceToAdd: string
) {
  // console.log('addPieceInsteadPawn()')
  const copiedState = _.cloneDeep(state)
  copiedState.board[coordsToFill.i][coordsToFill.j] = pieceToAdd
  return { newState: copiedState }
}
