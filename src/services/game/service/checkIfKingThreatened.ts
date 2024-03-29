import { GameState } from '../../../models/GameState'
import { paintKingCellToRed } from '../controller/paintKingCellToRed'
import { chess } from '.'

export function checkIfKingThreatened(
  state: GameState,
  isFakeCheck = false,
  coordToCheck?: { i: number; j: number }
) {
  // console.log('checkIfKingThreateneds()')
  const { board } = state
  let isFoundThreatenPiece = false

  let kingPos = state.isBlackTurn ? state.kingPos.black : state.kingPos.white

  // this act is for check another piece as a king coords (for example when castling..)
  if (coordToCheck) kingPos = coordToCheck

  const knightOpts = chess.getAllPossibleCoordsKnight(state, kingPos)
  const kingOpts = chess.getAllPossibleCoordsKing(state, kingPos)
  const queenOpts = chess.getAllPossibleCoordsQueen(state, kingPos, true)
  const pawnOpts = chess.getAllPossibleKingCoordsToGetEatenPawn(state, kingPos)
  const bishopOpts = chess.getAllPossibleCoordsBishop(state, kingPos)
  const rookOpts = chess.getAllPossibleCoordsRook(state, kingPos)

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
        !isFakeCheck && paintKingCellToRed(kingPos) // !!
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
        !isFakeCheck && paintKingCellToRed(kingPos) // !!
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

  const copiedState: GameState = chess.cloneDeep(state)

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
