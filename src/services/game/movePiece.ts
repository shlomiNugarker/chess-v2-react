import * as _ from 'lodash'
import { GameState } from '../../models/GameState'
import { isBlackPiece } from './isBlackPiece'
import { updateKingPos } from './updateKingPos'

export function movePiece(
  state: GameState,
  toCellCoord: {
    i: number
    j: number
  }
) {
  console.log('movePiece()')

  const fromCoord = state.selectedCellCoord
  const toCoord = toCellCoord

  const isKingMoved =
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.KING_WHITE) ||
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.KING_BLACK)

  const isRookMoved =
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_WHITE) ||
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_BLACK)

  const isCellWithPiece = state.board[toCoord.i][toCoord.j]

  if (!fromCoord) return state

  let copiedState = _.cloneDeep(state)

  if (isCellWithPiece) {
    // Eat the piece!

    const eatenPiece = copiedState.board[toCoord.i][toCoord.j]
    const isEatenPieceBlack = isBlackPiece(copiedState, eatenPiece)

    if (isEatenPieceBlack === true) {
      copiedState.eatenPieces.white.push(eatenPiece)
    } else if (isEatenPieceBlack === false) {
      copiedState.eatenPieces.black.push(eatenPiece)
    }
  }

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = ''
  copiedState.board[toCoord.i][toCoord.j] = piece

  if (isKingMoved) {
    copiedState = updateKingPos(copiedState, toCoord, piece)

    if (copiedState.isBlackTurn) {
      copiedState.isCastlingLegal.blackKing = false
    } else {
      copiedState.isCastlingLegal.whiteKing = false
    }
  }

  if (isRookMoved) {
    if (fromCoord.j === 0) {
      state.isBlackTurn
        ? (copiedState.isCastlingLegal.blackLeftSide = false)
        : (copiedState.isCastlingLegal.whiteLeftSide = false)
    } else if (fromCoord.j === 7) {
      state.isBlackTurn
        ? (copiedState.isCastlingLegal.blackRightSide = false)
        : (copiedState.isCastlingLegal.whiteRightSide = false)
    }
  }

  return copiedState
}
