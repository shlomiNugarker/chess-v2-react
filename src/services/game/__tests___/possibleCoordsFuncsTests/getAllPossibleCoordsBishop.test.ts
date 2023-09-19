import { GameState } from '../../../../models/GameState'
import { chess } from '../../service'

describe('getAllPossibleCoordsBishop', () => {
  test('returns possible coordinates for a bishop with obstructions', () => {
    const pieces = chess.gPieces

    const state = {
      pieces,
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
    const pieceCoord = { i: 0, j: 2 }

    const result = chess.getAllPossibleCoordsBishop(
      state as GameState,
      pieceCoord
    )

    const expectedCoords = [
      { i: 1, j: 3 },
      { i: 1, j: 1 },
    ]

    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a bishop with no obstructions', () => {
    const pieces = chess.gPieces

    const state = {
      pieces,
      board: [
        [
          pieces.ROOK_BLACK,
          pieces.KNIGHT_BLACK,
          '',
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
        ['', '', '', pieces.BISHOP_BLACK, '', '', '', ''],
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
    const pieceCoord = { i: 3, j: 3 }

    const result = chess.getAllPossibleCoordsBishop(
      state as GameState,
      pieceCoord
    )

    const expectedCoords = [
      { i: 4, j: 4 },
      { i: 5, j: 5 },
      { i: 6, j: 6 },
      { i: 4, j: 2 },
      { i: 5, j: 1 },
      { i: 6, j: 0 },
      { i: 2, j: 4 },
      { i: 1, j: 5 },
      { i: 2, j: 2 },
      { i: 1, j: 1 },
    ]

    expect(result).toEqual(expectedCoords)
  })
})
