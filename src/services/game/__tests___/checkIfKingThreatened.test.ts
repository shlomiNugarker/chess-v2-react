import { checkIfKingThreatened } from '../service/checkIfKingThreatened'
import { gPieces } from '../service/gPieces'
import { GameState } from '../../../models/GameState'

describe('checkIfKingThreatened', () => {
  test('detects a threat from a queen', () => {
    const pieces = gPieces

    const state = {
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          pieces.QUEEN_BLACK,
          '',
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
        [pieces.KING_BLACK, '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        [pieces.QUEEN_WHITE, '', '', '', '', '', '', ''],
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
          '',
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
      isBlackTurn: true,
      pieces,
      kingPos: {
        black: { i: 2, j: 0 },
        white: { i: 5, j: 0 },
      },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
    }

    const result = checkIfKingThreatened(state as GameState)
    expect(result.isThreatened).toBe(true)
  })

  test('does not detect a threat when the king is not threatened', () => {
    const pieces = gPieces

    const state = {
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          pieces.QUEEN_BLACK,
          '',
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
        [pieces.KING_BLACK, '', '', '', '', '', '', ''],
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
      isBlackTurn: true,
      pieces,
      kingPos: {
        black: { i: 2, j: 0 },
        white: { i: 7, j: 4 },
      },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
    }

    const result = checkIfKingThreatened(state as GameState)
    expect(result.isThreatened).toBe(false)
  })
})
