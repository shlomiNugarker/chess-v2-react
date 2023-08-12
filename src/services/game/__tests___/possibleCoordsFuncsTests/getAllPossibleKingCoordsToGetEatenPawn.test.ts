import { gPieces } from '../../gPieces'
import { GameState } from '../../../../models/GameState'

import { getAllPossibleKingCoordsToGetEatenPawn } from '../../possibleCoordsFuncs/getAllPossibleKingCoordsToGetEatenPawn'

describe('getAllPossibleKingCoordsToGetEatenPawn', () => {
  test('returns possible coordinates for a black king to capture an advancing white pawn', () => {
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
    const kingCoord = { i: 0, j: 4 }

    const result = getAllPossibleKingCoordsToGetEatenPawn(
      state as GameState,
      kingCoord
    )

    const expectedCoords = [
      { i: 1, j: 3 },
      { i: 1, j: 5 },
    ]

    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a white king to capture an advancing black pawn', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: false,
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
    const kingCoord = { i: 7, j: 4 }
    const result = getAllPossibleKingCoordsToGetEatenPawn(
      state as GameState,
      kingCoord
    )

    const expectedCoords = [
      { i: 6, j: 3 },
      { i: 6, j: 5 },
    ]
    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a white king to capture an advancing black pawn with no obstructions', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: false,
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
        ['', '', '', '', pieces.KING_WHITE, '', '', ''],
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
          '',
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
    }
    const kingCoord = { i: 4, j: 4 }
    const result = getAllPossibleKingCoordsToGetEatenPawn(
      state as GameState,
      kingCoord
    )

    const expectedCoords = [
      { i: 3, j: 3 },
      { i: 3, j: 5 },
    ]
    expect(result).toEqual(expectedCoords)
  })
})
