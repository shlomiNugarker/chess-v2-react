import { getAllPossibleCoordsKnight } from '../../service/possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { gPieces } from '../../service/gPieces'
import { GameState } from '../../../../models/GameState'

describe('getAllPossibleCoordsKnight', () => {
  test('returns possible coordinates for a knight with obstructions', () => {
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

    const pieceCoord = { i: 0, j: 1 }
    const result = getAllPossibleCoordsKnight(state as GameState, pieceCoord)

    const expectedCoords: {
      i: number
      j: number
    }[] = [
      { i: 2, j: 2 },
      { i: 2, j: 0 },
    ]

    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a knight with no obstructions', () => {
    const pieces = gPieces

    const state = {
      pieces,
      isBlackTurn: true,
      isCastlingLegal: { blackKing: true, whiteKing: true },
      board: [
        [
          pieces.ROOK_BLACK,
          '',
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
        ['', '', '', pieces.KNIGHT_BLACK, '', '', '', ''],
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
    const result = getAllPossibleCoordsKnight(state as GameState, pieceCoord)

    const expectedCoords: {
      i: number
      j: number
    }[] = [
      { i: 2, j: 5 },
      { i: 2, j: 1 },
      { i: 4, j: 1 },
      { i: 4, j: 5 },
      { i: 5, j: 4 },
      { i: 5, j: 2 },
    ]

    expect(result).toEqual(expectedCoords)
  })
})
