import { GameState } from '../../models/GameState'
import { getPossibleCoords } from './getPossibleCoords'
import { isBlackPiece } from './isBlackPiece'
import { isNextStepLegal } from './isNextStepLegal'
import _ from 'lodash'

export function isPlayerWin(state: GameState) {
  const { board, isBlackTurn } = state

  if (isBlackTurn) {
    let isBlackWin = true
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const piece = board[i][j]
        if (isBlackPiece(state, piece)) {
          const possibleCoords = getPossibleCoords(state, piece, { i, j })

          if (!possibleCoords) return
          for (let k = 0; k < possibleCoords.length; k++) {
            const coord = possibleCoords[k]
            const copyState = _.cloneDeep(state)
            copyState.selectedCellCoord = { i, j }
            const element = {} as Element
            element.id = `cell-${coord.i}-${coord.j}`
            const { isMoveLegal } = isNextStepLegal(copyState, element)

            if (isMoveLegal) {
              isBlackWin = false
              break
            }
          }
        }
      }
    }

    return isBlackWin
  } else if (!isBlackTurn) {
    let isWhiteWin = true
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const piece = board[i][j]
        const isBlack = isBlackPiece(state, piece)
        const isWhite = typeof isBlack === 'boolean' && isBlack === false
        if (isWhite) {
          const possibleCoords = getPossibleCoords(state, piece, { i, j })

          if (!possibleCoords) return
          for (let k = 0; k < possibleCoords.length; k++) {
            const coord = possibleCoords[k]
            const copyState = _.cloneDeep(state)
            copyState.selectedCellCoord = { i, j }
            const element = {} as Element
            element.id = `cell-${coord.i}-${coord.j}`
            const { isMoveLegal } = isNextStepLegal(copyState, element)

            if (isMoveLegal) {
              isWhiteWin = false
              break
            }
          }
        }
      }
    }
    return isWhiteWin
  }
}
