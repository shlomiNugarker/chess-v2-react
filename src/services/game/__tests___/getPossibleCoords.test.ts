import { getPossibleCoords } from '../getPossibleCoords'
import { gPieces } from '../gPieces'
import { GameState } from '../../../models/GameState'

describe('getPossibleCoords', () => {
  test('returns possible coordinates for a pawn', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 1, j: 0 },
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          pieces.QUEEN_BLACK,
          pieces.KING_BLACK,
          '',
          '',
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
        ['', '', pieces.BISHOP_BLACK, '', '', pieces.KNIGHT_BLACK, '', ''],
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
    const piece = state.pieces.PAWN_BLACK
    const cellCoord = { i: 1, j: 0 }
    const expectedCoords = [
      { i: 2, j: 0 },
      { i: 3, j: 0 },
    ]

    const result = getPossibleCoords(state as GameState, piece, cellCoord)

    expect(result).toEqual(expectedCoords)
  })
  test('returns possible coordinates for a queen', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 3, j: 0 },
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          pieces.BISHOP_BLACK,
          '',
          pieces.KING_BLACK,
          '',
          '',
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
        [
          pieces.QUEEN_BLACK,
          '',
          pieces.BISHOP_BLACK,
          '',
          '',
          pieces.KNIGHT_BLACK,
          '',
          '',
        ],
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
    const piece = pieces.QUEEN_BLACK
    const cellCoord = { i: 3, j: 0 }
    const expectedCoords = [
      { i: 4, j: 1 },
      { i: 5, j: 2 },
      { i: 6, j: 3 },
      { i: 2, j: 1 },
      { i: 2, j: 0 },
      { i: 4, j: 0 },
      { i: 5, j: 0 },
      { i: 6, j: 0 },
      { i: 3, j: 1 },
    ]

    const result = getPossibleCoords(state as GameState, piece, cellCoord)

    expect(result).toEqual(expectedCoords)
  })
})
