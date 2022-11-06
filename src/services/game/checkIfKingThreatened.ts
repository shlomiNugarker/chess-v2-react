import _ from 'lodash'
import { GameState } from '../../features/game/gameSlice'
import { paintKingCellToRed } from './main'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'
import { getAllPossibleKingCoordsToGetEatenPawn } from './possibleCoordsFuncs/getAllPossibleKingCoordsToGetEatenPawn'

export function checkIfKingThreatened(state: GameState, isFakeCheck = false) {
  const { board } = state
  let isFoundThreatenPiece = false

  let kingPos = state.isBlackTurn ? state.kingPos.black : state.kingPos.white

  const knightOpts = getAllPossibleCoordsKnight(state, kingPos)
  const queenOpts = getAllPossibleCoordsQueen(state, kingPos, true)
  const pawnOpts = getAllPossibleKingCoordsToGetEatenPawn(state, kingPos)
  const bishopOpts = getAllPossibleCoordsBishop(state, kingPos)
  const rookOpts = getAllPossibleCoordsRook(state, kingPos)

  // console.log({ knightOpts, queenOpts, pawnOpts, bishopOpts, rookOpts })

  !isFoundThreatenPiece &&
    queenOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = state.isBlackTurn
        ? state.pieces.QUEEN_WHITE
        : state.pieces.QUEEN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)

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
        console.log(pieceToCheck, '===', threatenPiece)

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
        console.log(pieceToCheck, '===', threatenPiece)

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
        console.log(pieceToCheck, '===', threatenPiece)

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
        console.log(pieceToCheck, '===', threatenPiece)

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

  // if (!isFakeCheck) {
  copiedState.isBlackTurn
    ? (copiedState.isBlackKingThreatened = true)
    : (copiedState.isWhiteKingThreatened = true)
  // }

  return { isThreatened: true, state: copiedState }
}
