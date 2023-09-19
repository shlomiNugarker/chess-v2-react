import { GameState } from '../../../models/GameState'
import { chess } from '.'

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
          ? chess.isBlackPiece(state, piece)
          : !chess.isBlackPiece(state, piece) &&
            typeof chess.isBlackPiece(state, piece) === 'boolean'
      ) {
        const possibleCoords = chess.getPossibleCoords(state, piece, { i, j })

        if (!possibleCoords) return
        for (let k = 0; k < possibleCoords.length; k++) {
          const coord = possibleCoords[k]
          const copyState = chess.cloneDeep(state)
          copyState.selectedCellCoord = { i, j }

          const { isMoveLegal } = chess.isNextStepLegal(copyState, coord)

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
