import * as _ from 'lodash'
import { GameState } from '../../../models/GameState'

import { checkIfKingThreatened } from './checkIfKingThreatened'

export function isNextStepLegal(
  state: GameState,
  toCoord: {
    i: number
    j: number
  }
) {
  // console.log('isNextStepLegal()')

  const fromCoord = state.selectedCellCoord

  if (!fromCoord) return { isMoveLegal: false, state }

  const copiedState: GameState = _.cloneDeep(state)

  const isKingMoved =
    copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.KING_WHITE ||
    copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.KING_BLACK

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = state.pieces.EMPTY
  copiedState.board[toCoord.i][toCoord.j] = piece

  if (isKingMoved) {
    if (piece === state.pieces.KING_WHITE) {
      copiedState.kingPos.white = { i: toCoord.i, j: toCoord.j }
      copiedState.isCastlingLegal.whiteLeftSide = false
      copiedState.isCastlingLegal.whiteRightSide = false
    }
    if (piece === state.pieces.KING_BLACK) {
      copiedState.kingPos.black = { i: toCoord.i, j: toCoord.j }
      copiedState.isCastlingLegal.blackLeftSide = false
      copiedState.isCastlingLegal.blackRightSide = false
    }
  }
  const { isThreatened, state: stateToReturn } = checkIfKingThreatened(
    copiedState,
    true
  )
  return { isMoveLegal: !isThreatened, state: stateToReturn }
}
