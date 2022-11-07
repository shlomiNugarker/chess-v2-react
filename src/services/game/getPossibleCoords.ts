import { GameState } from '../../features/game/gameSlice'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKing } from './possibleCoordsFuncs/getAllPossibleCoordsKing'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsPawn } from './possibleCoordsFuncs/getAllPossibleCoordsPawn'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'

export function getPossibleCoords(
  state: GameState,
  piece: string,
  cellCoord: {
    i: number
    j: number
  }
) {
  if (!piece) return

  let possibleCoords: { i: number; j: number }[] = []
  switch (piece) {
    case state.pieces.PAWN_BLACK:
    case state.pieces.PAWN_WHITE:
      console.log('getAllPossibleCoordsPawn')
      possibleCoords = getAllPossibleCoordsPawn(
        state,
        cellCoord,
        piece === state.pieces.PAWN_WHITE
      )
      break
    case state.pieces.BISHOP_BLACK:
    case state.pieces.BISHOP_WHITE:
      console.log('getAllPossibleCoordsBishop')
      possibleCoords = getAllPossibleCoordsBishop(state, cellCoord)
      break
    case state.pieces.KING_BLACK:
    case state.pieces.KING_WHITE:
      console.log('getAllPossibleCoordsKing')
      possibleCoords = getAllPossibleCoordsKing(state, cellCoord)
      break
    case state.pieces.KNIGHT_BLACK:
    case state.pieces.KNIGHT_WHITE:
      console.log('getAllPossibleCoordsKnight')
      possibleCoords = getAllPossibleCoordsKnight(state, cellCoord)
      break
    case state.pieces.QUEEN_BLACK:
    case state.pieces.QUEEN_WHITE:
      console.log('getAllPossibleCoordsQueen')
      possibleCoords = getAllPossibleCoordsQueen(state, cellCoord)
      break
    case state.pieces.ROOK_BLACK:
    case state.pieces.ROOK_WHITE:
      console.log('getAllPossibleCoordsRook')
      possibleCoords = getAllPossibleCoordsRook(state, cellCoord)
      break
  }
  return possibleCoords
}
