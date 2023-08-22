import * as _ from 'lodash'
import { GameState } from '../../models/GameState'
import { getCellCoord } from './getCellCoord'
import { isCastleThreatened } from './isCastleThreatened'

export function doCastling(state: GameState, elToCell: Element) {
  console.log('doCastling()')

  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)
  if (!fromCoord) return

  let kingPiece: string = ''
  let newKingCoords: { i: number; j: number } | null = null
  let rookPiece: string
  let rookCoords: { i: number; j: number }
  let isCastleLegal: boolean = true

  const copiedState = _.cloneDeep(state)

  // WHITE KING:
  if (
    state.board[toCoord.i][toCoord.j] === state.pieces.KING_WHITE ||
    state.board[toCoord.i][toCoord.j] === state.pieces.ROOK_WHITE
  ) {
    if (
      copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_WHITE
    ) {
      rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
      kingPiece = copiedState.board[toCoord.i][toCoord.j]
      rookCoords = fromCoord
    } else {
      rookPiece = copiedState.board[toCoord.i][toCoord.j]
      kingPiece = copiedState.board[fromCoord.i][fromCoord.j]
      rookCoords = toCoord
    }

    if (rookCoords.j === 0 && !state.isCastlingLegal.whiteLeftSide) return

    if (rookCoords.j === 7 && !state.isCastlingLegal.whiteRightSide) return

    if (!state.isCastlingLegal.whiteKing) return

    if (state.isWhiteKingThreatened) return

    copiedState.board[fromCoord.i][fromCoord.j] = ''
    copiedState.board[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCoords = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCoords = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCoords
    }
    copiedState.isCastlingLegal.whiteKing = false
  }

  // BLACK KING:
  if (
    state.board[toCoord.i][toCoord.j] === state.pieces.KING_BLACK ||
    state.board[toCoord.i][toCoord.j] === state.pieces.ROOK_BLACK
  ) {
    if (
      copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_BLACK
    ) {
      rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
      kingPiece = copiedState.board[toCoord.i][toCoord.j]
      rookCoords = fromCoord
    } else {
      rookPiece = copiedState.board[toCoord.i][toCoord.j]
      kingPiece = copiedState.board[fromCoord.i][fromCoord.j]
      rookCoords = toCoord
    }

    if (rookCoords.j === 0 && !state.isCastlingLegal.blackLeftSide) return

    if (rookCoords.j === 7 && !state.isCastlingLegal.blackRightSide) return

    if (!state.isCastlingLegal.blackKing) return

    if (state.isBlackKingThreatened) return

    copiedState.board[fromCoord.i][fromCoord.j] = ''
    copiedState.board[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    }
    copiedState.isCastlingLegal.blackKing = false
  }

  return { newState: copiedState, isCastleLegal }
}
