import _ from 'lodash'
import { GameState } from '../../../models/GameState'
import { getPossibleCoords } from './getPossibleCoords'
import { isBlackPiece } from './isBlackPiece'
import { isNextStepLegal } from './isNextStepLegal'
import { movePiece } from './movePiece'

export const doRandomMove = (state: GameState) => {
  const copiedState: GameState = _.cloneDeep(state)
  const possibleMoves = getAllPossiblePiecesMoves(copiedState)

  const randomMove =
    possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  const piece = copiedState.board[randomMove.i][randomMove.j]

  const possibleCoords = getPossibleCoords(copiedState, piece, randomMove)

  const randomPossibleMove =
    possibleCoords[Math.floor(Math.random() * possibleCoords.length)]

  // console.log({ randomMove, randomPossibleMove })

  copiedState.selectedCellCoord = randomMove
  const { isMoveLegal } = isNextStepLegal(copiedState, randomPossibleMove)
  if (!isMoveLegal) {
    return
  }
  const newState = movePiece(copiedState, randomPossibleMove)
  return newState
}

export const getAllPossiblePiecesMoves = (state: GameState) => {
  const possibleMoves: { i: number; j: number }[] = []

  for (let i = 0; i < state.board.length; i++) {
    for (let j = 0; j < state.board[i].length; j++) {
      const piece = state.board[i][j]
      const cellCoord = { i, j }
      const possibleCoords = getPossibleCoords(state, piece, cellCoord)
      if (
        possibleCoords?.length &&
        state.isBlackTurn &&
        isBlackPiece(state, state.board[i][j])
      ) {
        possibleMoves.push(cellCoord)
      } else if (
        possibleCoords?.length &&
        !state.isBlackTurn &&
        !isBlackPiece(state, state.board[i][j])
      ) {
        possibleMoves.push(cellCoord)
      }
    }
  }
  return possibleMoves
}
