import _ from 'lodash'
import { GameState } from '../../models/GameState'
import { paintKingCellToRed } from './paintKingCellToRed'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKing } from './possibleCoordsFuncs/getAllPossibleCoordsKing'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'
import { getAllPossibleKingCoordsToGetEatenPawn } from './possibleCoordsFuncs/getAllPossibleKingCoordsToGetEatenPawn'

export function checkIfKingThreatened(
  state: GameState,
  isFakeCheck = false,
  coordToCheck?: { i: number; j: number }
) {
  const { board } = state
  let isFoundThreatenPiece = false

  let kingPos = state.isBlackTurn ? state.kingPos.black : state.kingPos.white

  // this act is for check another piece as a king coords (when castling..)
  if (coordToCheck) kingPos = coordToCheck

  const knightOpts = getAllPossibleCoordsKnight(state, kingPos)
  const kingOpts = getAllPossibleCoordsKing(state, kingPos)
  const queenOpts = getAllPossibleCoordsQueen(state, kingPos, true)
  const pawnOpts = getAllPossibleKingCoordsToGetEatenPawn(state, kingPos)
  const bishopOpts = getAllPossibleCoordsBishop(state, kingPos)
  const rookOpts = getAllPossibleCoordsRook(state, kingPos)

  !isFoundThreatenPiece &&
    queenOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.QUEEN_WHITE
        : state.pieces.QUEEN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    kingOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.KING_WHITE
        : state.pieces.KING_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    knightOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.KNIGHT_WHITE
        : state.pieces.KNIGHT_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    pawnOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.PAWN_WHITE
        : state.pieces.PAWN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    bishopOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.BISHOP_WHITE
        : state.pieces.BISHOP_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    rookOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.ROOK_WHITE
        : state.pieces.ROOK_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  const copiedState: GameState = _.cloneDeep(state)

  if (!isFoundThreatenPiece) {
    if (!isFakeCheck) {
      copiedState.isBlackTurn
        ? (copiedState.isBlackKingThreatened = false)
        : (copiedState.isWhiteKingThreatened = false)

      document.querySelector('.red')?.classList.remove('red')
    }
    return { isThreatened: false, state: copiedState }
  }

  copiedState.isBlackTurn
    ? (copiedState.isBlackKingThreatened = true)
    : (copiedState.isWhiteKingThreatened = true)

  return { isThreatened: true, state: copiedState }
}
