import { GameState } from '../../../models/GameState'
import { chess } from '.'

export function getPossibleCoords(
  state: GameState,
  piece: string,
  cellCoord: {
    i: number
    j: number
  }
) {
  // console.log('getPossibleCoords()')
  if (!piece) return []

  let possibleCoords: { i: number; j: number }[] = []
  switch (piece) {
    case state.pieces.PAWN_BLACK:
    case state.pieces.PAWN_WHITE:
      possibleCoords = chess.getAllPossibleCoordsPawn(
        state,
        cellCoord,
        piece === state.pieces.PAWN_WHITE
      )
      break
    case state.pieces.BISHOP_BLACK:
    case state.pieces.BISHOP_WHITE:
      possibleCoords = chess.getAllPossibleCoordsBishop(state, cellCoord)
      break
    case state.pieces.KING_BLACK:
    case state.pieces.KING_WHITE:
      possibleCoords = chess.getAllPossibleCoordsKing(state, cellCoord)
      break
    case state.pieces.KNIGHT_BLACK:
    case state.pieces.KNIGHT_WHITE:
      possibleCoords = chess.getAllPossibleCoordsKnight(state, cellCoord)
      break
    case state.pieces.QUEEN_BLACK:
    case state.pieces.QUEEN_WHITE:
      possibleCoords = chess.getAllPossibleCoordsQueen(state, cellCoord)
      break
    case state.pieces.ROOK_BLACK:
    case state.pieces.ROOK_WHITE:
      possibleCoords = chess.getAllPossibleCoordsRook(state, cellCoord)
      break
  }
  return possibleCoords
}
