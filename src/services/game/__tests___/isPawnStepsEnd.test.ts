import { isPawnStepsEnd } from '../service/isPawnStepsEnd'
import { gPieces } from '../service/gPieces'
import { GameState } from '../../../models/GameState'

describe('isPawnStepsEnd', () => {
  test('returns false for black pawn at the board', () => {
    const pieces = gPieces
    const state = {
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          pieces.QUEEN_BLACK,
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
        ['', '', '', '', pieces.QUEEN_WHITE, '', '', ''],
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
      pieces,
      isBlackTurn: true,
    }
    const coord = { i: 6, j: 0 }

    const result = isPawnStepsEnd(state as GameState, coord)

    expect(result).toBe(false)
  })

  test('returns true for white pawn at the end of the board', () => {
    const pieces = gPieces
    const state = {
      board: [
        [
          pieces.PAWN_WHITE,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          pieces.QUEEN_BLACK,
          pieces.KING_BLACK,
          pieces.BISHOP_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.ROOK_BLACK,
        ],
        [
          '',
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
        ],
        ['', '', '', '', '', '', '', pieces.PAWN_BLACK],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', pieces.QUEEN_WHITE, '', '', ''],
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
      pieces,
      isBlackTurn: false,
    }
    const coord = { i: 0, j: 0 }

    const result = isPawnStepsEnd(state as GameState, coord)

    expect(result).toBe(true)
  })
})
