import { GameState } from '../../../models/GameState'
import { getPossibleCoords } from './getPossibleCoords'
import { isBlackPiece } from './isBlackPiece'
import { isNextStepLegal } from './isNextStepLegal'
import * as _ from 'lodash'

export function isPlayerWin(state: GameState) {
  // console.log('isPlayerWin()')

  const { board, isBlackTurn } = state
  const color = isBlackTurn ? 'black' : 'white'
  let isWin = true

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j]
      if (
        color === 'black'
          ? isBlackPiece(state, piece)
          : !isBlackPiece(state, piece) &&
            typeof isBlackPiece(state, piece) === 'boolean'
      ) {
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
            isWin = false
            break
          }
        }
      }
    }
  }
  return isWin
}
