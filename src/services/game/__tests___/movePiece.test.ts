import { movePiece } from '../movePiece'
import { gPieces } from '../gPieces'
import { GameState } from '../../../models/GameState'

describe('movePiece', () => {
  test('moves a piece to an empty cell', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 5, j: 4 },
      kingPos: { black: { i: 0, j: 4 } },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      eatenPieces: {
        black: [],
        white: [],
      },
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
    }

    const expectedBoard = [
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
      ['', '', '', '', '', '', pieces.QUEEN_WHITE, ''],
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
    ]

    const toCellCoord = { i: 5, j: 6 }

    const newState = movePiece(state as unknown as GameState, toCellCoord)
    expect(newState).toBeDefined()
    expect(newState.board).toEqual(expectedBoard)
  })

  test('moves a piece and eats an opponent piece', () => {
    const pieces = gPieces
    const state = {
      pieces,
      isBlackTurn: true,
      selectedCellCoord: { i: 5, j: 4 },
      kingPos: { black: { i: 0, j: 4 } },
      isCastlingLegal: {
        whiteLeftSide: true,
        whiteRightSide: true,
        whiteKing: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      eatenPieces: {
        black: [],
        white: [],
      },
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
          '',
        ],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', pieces.QUEEN_WHITE, '', pieces.PAWN_BLACK, ''],
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
    }

    const expectedBoard = [
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
        '',
      ],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', pieces.QUEEN_WHITE, ''],
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
    ]

    const toCellCoord = { i: 5, j: 6 }

    const newState = movePiece(state as unknown as GameState, toCellCoord)
    expect(newState).toBeDefined()
    expect(newState.board).toEqual(expectedBoard)
  })
})
