import { GameState } from '../../../models/GameState'
import { chess } from '../service'

describe('isCastleThreatened', () => {
  test('returns true if castle is legal', () => {
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
          '',
          '',
          '',
          pieces.KING_BLACK,
          pieces.BISHOP_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.ROOK_BLACK,
        ],
        [
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
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
          pieces.PAWN_WHITE,
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
          pieces.QUEEN_WHITE,
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
    }
    const fromCoord = { i: 0, j: 4 }
    const toCoord = { i: 0, j: 0 }

    const result = chess.isCastleThreatened(
      state as GameState,
      fromCoord,
      toCoord
    )
    expect(result).toBe(true)
  })

  test('returns false if castle is not threatened', () => {
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
          pieces.ROOK_WHITE,
          '',
          '',
          pieces.KING_BLACK,
          pieces.BISHOP_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.ROOK_BLACK,
        ],
        [
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
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
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
          pieces.PAWN_WHITE,
        ],
        [
          '',
          pieces.KNIGHT_WHITE,
          pieces.BISHOP_WHITE,
          pieces.QUEEN_WHITE,
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
    }
    const fromCoord = { i: 0, j: 0 }
    const toCoord = { i: 0, j: 4 }

    const result = chess.isCastleThreatened(
      state as GameState,
      fromCoord,
      toCoord
    )
    expect(result).toBe(false)
  })
})
