import { GameState } from '../../../models/GameState'
import { chess } from '../service'

describe('isNextStepLegal', () => {
  test('returns false if the next step is not legal', () => {
    const pieces = chess.gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 0, j: 4 },
      kingPos: { black: { i: 0, j: 4 } },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.QUEEN_WHITE,
          '',
          '',
          pieces.KING_BLACK,
          pieces.BISHOP_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.ROOK_BLACK,
        ],
        [
          pieces.PAWN_BLACK,
          '',
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
        ],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        [
          pieces.PAWN_WHITE,
          '',
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
        ],
        [
          pieces.ROOK_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.BISHOP_WHITE,
          '',
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
    }

    const { isMoveLegal } = chess.isNextStepLegal(state as GameState, {
      i: 0,
      j: 3,
    })

    expect(isMoveLegal).toBe(false)
  })
  test('returns true if the next step is legal', () => {
    const pieces = chess.gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 0, j: 0 },
      kingPos: { black: { i: 0, j: 4 } },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.QUEEN_WHITE,
          '',
          '',
          pieces.KING_BLACK,
          pieces.BISHOP_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.ROOK_BLACK,
        ],
        [
          pieces.PAWN_BLACK,
          '',
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
        ],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        [
          pieces.PAWN_WHITE,
          '',
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
        ],
        [
          pieces.ROOK_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.BISHOP_WHITE,
          '',
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
    }

    const { isMoveLegal } = chess.isNextStepLegal(state as GameState, {
      i: 0,
      j: 1,
    })

    expect(isMoveLegal).toBe(true)
  })
})
