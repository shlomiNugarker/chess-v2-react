import * as _ from 'lodash'
import { GameState } from '../../../models/GameState'
import { isBlackPiece } from './isBlackPiece'
import { updateKingPos } from './updateKingPos'
import { gPieces } from './gPieces'

export function movePiece(
  state: GameState,
  toCellCoord: {
    i: number
    j: number
  }
) {
  // console.log('movePiece()')
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

  if (
    !copiedState.isBlackTurn &&
    copiedState.eatableCellAfterTwoStepsPawnBlack &&
    copiedState.eatableCellAfterTwoStepsPawnBlack.i === toCoord.i + 1 &&
    copiedState.eatableCellAfterTwoStepsPawnBlack.j === toCoord.j
  ) {
    const piece =
      copiedState.board[copiedState.eatableCellAfterTwoStepsPawnBlack.i][
        copiedState.eatableCellAfterTwoStepsPawnBlack.j
      ]
    copiedState.board[copiedState.eatableCellAfterTwoStepsPawnBlack.i][
      copiedState.eatableCellAfterTwoStepsPawnBlack.j
    ] = ''
    copiedState.eatenPieces.white.push(piece)
  }
  if (
    copiedState.isBlackTurn &&
    copiedState.eatableCellAfterTwoStepsPawnWhite &&
    copiedState.eatableCellAfterTwoStepsPawnWhite.i === toCoord.i - 1 &&
    copiedState.eatableCellAfterTwoStepsPawnWhite.j === toCoord.j
  ) {
    const piece =
      copiedState.board[copiedState.eatableCellAfterTwoStepsPawnWhite.i][
        copiedState.eatableCellAfterTwoStepsPawnWhite.j
      ]
    copiedState.board[copiedState.eatableCellAfterTwoStepsPawnWhite.i][
      copiedState.eatableCellAfterTwoStepsPawnWhite.j
    ] = ''
    copiedState.eatenPieces.black.push(piece)
  }

  if (
    copiedState.board[fromCoord.i][fromCoord.j] === gPieces.PAWN_WHITE &&
    fromCoord.i === 6 &&
    toCoord.i === 4
  ) {
    copiedState.eatableCellAfterTwoStepsPawnWhite = toCoord
  } else if (
    copiedState.board[fromCoord.i][fromCoord.j] === gPieces.PAWN_BLACK &&
    fromCoord.i === 1 &&
    toCoord.i === 3
  ) {
    copiedState.eatableCellAfterTwoStepsPawnBlack = toCoord
  } else {
    if (copiedState.eatableCellAfterTwoStepsPawnBlack)
      copiedState.eatableCellAfterTwoStepsPawnBlack = null
    if (copiedState.eatableCellAfterTwoStepsPawnWhite)
      copiedState.eatableCellAfterTwoStepsPawnWhite = null
  }

  if (isCellWithPiece) {
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
