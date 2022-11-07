import { GameState } from '../../../models/GameState'
import { isColorPieceWorthCurrPlayerColor } from '../isColorPieceWorthCurrPlayerColor'
import { isEmptyCell } from '../isEmptyCell'

export function getAllPossibleCoordsKing(
  state: GameState,
  pieceCoord: { i: number; j: number }
) {
  const { board } = state
  let res: { i: number; j: number }[] = []

  const possibleSteps = [
    { i: -1, j: 0 },
    { i: 0, j: 1 },
    { i: -1, j: 1 },
    { i: -1, j: -1 },
    { i: 0, j: -1 },
    { i: 1, j: 0 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    const diffI = possibleSteps[k].i
    const diffJ = possibleSteps[k].j
    const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (isEmptyCell(board, nextCoord)) res.push(nextCoord)
      else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(state, piece)) {
          res.push(nextCoord) //push eatable coord
        }
      }
    }

    // castling Coord:
    const { isCastlingLegal } = state
    let isRightCastleLegal: boolean = true
    let isLeftCastleLegal: boolean = true

    if (!state.isBlackTurn && isCastlingLegal.whiteKing) {
      // right side:
      if (
        !isEmptyCell(board, { i: 7, j: 5 }) ||
        !isEmptyCell(board, { i: 7, j: 6 })
      ) {
        isRightCastleLegal = false
      }
      // left side:
      if (
        !isEmptyCell(board, { i: 7, j: 1 }) ||
        !isEmptyCell(board, { i: 7, j: 2 }) ||
        !isEmptyCell(board, { i: 7, j: 3 })
      ) {
        isLeftCastleLegal = false
      }

      let coordRightRookForCastle = { i: 7, j: 7 }
      isRightCastleLegal && res.push(coordRightRookForCastle)

      let coordLeftRookForCastle = { i: 7, j: 0 }
      isLeftCastleLegal && res.push(coordLeftRookForCastle)
    }

    if (state.isBlackTurn && isCastlingLegal.blackKing) {
      // right side:
      if (
        !isEmptyCell(board, { i: 0, j: 5 }) ||
        !isEmptyCell(board, { i: 0, j: 6 })
      ) {
        isRightCastleLegal = false
      }
      // left side:
      if (
        !isEmptyCell(board, { i: 0, j: 1 }) ||
        !isEmptyCell(board, { i: 0, j: 2 }) ||
        !isEmptyCell(board, { i: 0, j: 3 })
      ) {
        isLeftCastleLegal = false
      }

      let coordRightRookForCastle = { i: 0, j: 7 }
      isRightCastleLegal && res.push(coordRightRookForCastle)

      let coordLeftRookForCastle = { i: 0, j: 0 }
      isLeftCastleLegal && res.push(coordLeftRookForCastle)
    }
  }

  return res
}
