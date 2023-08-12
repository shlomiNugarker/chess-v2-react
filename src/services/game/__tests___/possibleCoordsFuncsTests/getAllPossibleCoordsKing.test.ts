import { getAllPossibleCoordsKing } from '../../possibleCoordsFuncs/getAllPossibleCoordsKing'
import { gPieces } from '../../gPieces'
import { GameState } from '../../../../models/GameState'

describe('getAllPossibleCoordsKing', () => {
  test('returns possible coordinates for a king with obstructions', () => {
    const pieces = gPieces

    const state = {
      pieces,
      isBlackTurn: true,
      isCastlingLegal: { blackKing: true, whiteKing: true },
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

    const pieceCoord = { i: 0, j: 4 }

    const result = getAllPossibleCoordsKing(state as GameState, pieceCoord)

    const expectedCoords: {
      i: number
      j: number
    }[] = []

    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a king with no obstructions', () => {
    const pieces = gPieces

    const state = {
      pieces,
      isBlackTurn: true,
      isCastlingLegal: { blackKing: true, whiteKing: true },
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
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', pieces.KING_BLACK, '', '', ''],
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

    const pieceCoord = { i: 4, j: 4 }

    const result = getAllPossibleCoordsKing(state as GameState, pieceCoord)

    const expectedCoords: {
      i: number
      j: number
    }[] = [
      { i: 3, j: 4 },
      { i: 4, j: 5 },
      { i: 3, j: 5 },
      { i: 3, j: 3 },
      { i: 4, j: 3 },
      { i: 5, j: 4 },
      { i: 5, j: 3 },
      { i: 5, j: 5 },
    ]

    expect(result).toEqual(expectedCoords)
  })
})
