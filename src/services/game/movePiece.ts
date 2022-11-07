import _ from 'lodash'
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

  if (!fromCoord) return

  let copiedState = _.cloneDeep(state)

  //** assigning eatable cell after 2 steps of pawn
  // White
  if (
    fromCoord.i === 6 &&
    copiedState.board[fromCoord.i][fromCoord.j] ===
      copiedState.pieces.PAWN_WHITE &&
    toCoord.i === 4 &&
    !state.isBlackTurn
  ) {
    const eatableCellOnlyAfterTwoSteps = {
      i: fromCoord.i - 1,
      j: fromCoord.j,
    }

    copiedState.eatableCellAfterTwoStepsPawnWhite = eatableCellOnlyAfterTwoSteps
  } else if (!copiedState.isBlackTurn) {
    copiedState.eatableCellAfterTwoStepsPawnWhite = null
  }
  //Black
  if (
    fromCoord.i === 1 &&
    copiedState.board[fromCoord.i][fromCoord.j] ===
      copiedState.pieces.PAWN_BLACK &&
    toCoord.i === 3 &&
    state.isBlackTurn
  ) {
    const eatableCellOnlyAfterTwoSteps = {
      i: fromCoord.i + 1,
      j: fromCoord.j,
    }
    copiedState.eatableCellAfterTwoStepsPawnBlack = eatableCellOnlyAfterTwoSteps
  } else if (copiedState.isBlackTurn) {
    copiedState.eatableCellAfterTwoStepsPawnBlack = null
  }
  //**

  if (isCellWithPiece) {
    // Eat !
    const eatenPiece = copiedState.board[toCoord.i][toCoord.j]
    if (isBlackPiece(copiedState, eatenPiece) === true) {
      copiedState.eatenPieces.white.push(eatenPiece)
    } else if (isBlackPiece(copiedState, eatenPiece) === false) {
      copiedState.eatenPieces.black.push(eatenPiece)
    }
  }

  // if the next move below/above the state.eatableCellAfterTwoStepsPawnBlack/White
  // Black eating:
  if (
    copiedState.eatableCellAfterTwoStepsPawnWhite &&
    toCellCoord.i === copiedState.eatableCellAfterTwoStepsPawnWhite.i &&
    copiedState.isBlackTurn
  ) {
    const { eatableCellAfterTwoStepsPawnWhite } = copiedState
    const { i, j } = eatableCellAfterTwoStepsPawnWhite
    const pieceToEat = copiedState.board[i - 1][j]
    copiedState.board[i - 1][j] = ''
    copiedState.eatenPieces.black.push(pieceToEat)
  }
  // White eating:
  if (
    copiedState.eatableCellAfterTwoStepsPawnBlack &&
    toCellCoord.i === copiedState.eatableCellAfterTwoStepsPawnBlack.i &&
    !copiedState.isBlackTurn
  ) {
    const { eatableCellAfterTwoStepsPawnBlack } = copiedState
    const { i, j } = eatableCellAfterTwoStepsPawnBlack
    const pieceToEat = copiedState.board[i + 1][j]
    copiedState.board[i + 1][j] = ''
    copiedState.eatenPieces.white.push(pieceToEat)
  }

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = ''
  copiedState.board[toCoord.i][toCoord.j] = piece

  if (isKingMoved) {
    copiedState = updateKingPos(copiedState, toCoord, piece)

    if (copiedState.isBlackTurn) {
      copiedState.isCastlingLegal.blackKing = false
    } else if (!copiedState.isBlackTurn) {
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
