import { GameState } from '../../../models/GameState'
import { isColorPieceWorthCurrPlayerColor } from '../isColorPieceWorthCurrPlayerColor'
import { isEmptyCell } from '../isEmptyCell'
import { isOptionToCastling } from '../isOptionToCastling'

export function getAllPossibleCoordsRook(
  state: GameState,
  pieceCoord: { i: number; j: number }
) {
  const { board } = state
  let res: { i: number; j: number }[] = []

  const possibleDir = [
    { i: -1, j: 0 }, //to top
    { i: 1, j: 0 }, // to bottom
    { i: 0, j: 1 }, // to right
    { i: 0, j: -1 }, // to left
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j

      const nextCoord = {
        i: pieceCoord.i + diffI,
        j: pieceCoord.j + diffJ,
      }

      if (
        nextCoord.i > 7 ||
        nextCoord.i < 0 ||
        nextCoord.j > 7 ||
        nextCoord.j < 0
      ) {
        break
      }

      if (isEmptyCell(board, nextCoord)) {
        res.push(nextCoord)
      } else {
        const piece = board[nextCoord.i][nextCoord.j]

        if (!isColorPieceWorthCurrPlayerColor(state, piece))
          res.push(nextCoord) //last coord -> eatable
        else if (
          isColorPieceWorthCurrPlayerColor(state, piece) &&
          isOptionToCastling(state, piece, pieceCoord)
        ) {
          let isCastlingLegal

          if (pieceCoord.j === 0) {
            isCastlingLegal = state.isBlackTurn
              ? state.isCastlingLegal.blackLeftSide
              : state.isCastlingLegal.whiteLeftSide
          }
          if (pieceCoord.j === 7) {
            isCastlingLegal = state.isBlackTurn
              ? state.isCastlingLegal.blackRightSide
              : state.isCastlingLegal.whiteRightSide
          }

          let isKingMoveLegal
          state.isBlackTurn
            ? (isKingMoveLegal = state.isCastlingLegal.blackKing)
            : (isKingMoveLegal = state.isCastlingLegal.whiteKing)

          isCastlingLegal && isKingMoveLegal && res.push(nextCoord)
        }
        break
      }
    }
  }
  return res
}
