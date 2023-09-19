import { GameState } from '../../../../models/GameState'
import { chess } from '../../service'

describe('getAllPossibleCoordsRook', () => {
  test('returns possible coordinates for a rook with obstructions', () => {
    const pieces = chess.gPieces

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

    const pieceCoord = { i: 0, j: 0 }
    const result = chess.getAllPossibleCoordsRook(
      state as GameState,
      pieceCoord
    )
    const expectedCoords: {
      i: number
      j: number
    }[] = []

    expect(result).toEqual(expectedCoords)
  })

  test('returns possible coordinates for a rook with no obstructions', () => {
    const pieces = chess.gPieces

    const state = {
      pieces,
      isBlackTurn: true,
      isCastlingLegal: { blackKing: true, whiteKing: true },
      board: [
        [
          '',
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
        ['', '', pieces.ROOK_BLACK, '', '', '', '', ''],
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

    const pieceCoord = { i: 4, j: 2 }
    const result = chess.getAllPossibleCoordsRook(
      state as GameState,
      pieceCoord
    )
    const expectedCoords: {
      i: number
      j: number
    }[] = [
      { i: 3, j: 2 },
      { i: 2, j: 2 },
      { i: 5, j: 2 },
      { i: 6, j: 2 },
      { i: 4, j: 3 },
      { i: 4, j: 4 },
      { i: 4, j: 5 },
      { i: 4, j: 6 },
      { i: 4, j: 7 },
      { i: 4, j: 1 },
      { i: 4, j: 0 },
    ]

    expect(result).toEqual(expectedCoords)
  })
})
