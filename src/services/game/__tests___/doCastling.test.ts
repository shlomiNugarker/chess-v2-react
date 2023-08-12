import { doCastling } from '../doCastling'
import { gPieces } from '../gPieces'
import { GameState } from '../../../models/GameState'

describe('doCastling', () => {
  test('performs castling for black king on the kingside', () => {
    const pieces = gPieces
    const state = {
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
      selectedCellCoord: { i: 0, j: 4 },
      isCastlingLegal: {
        whiteKing: true,
        whiteRightSide: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      isWhiteKingThreatened: false,
      isBlackTurn: true,
      pieces,
      kingPos: {
        white: { i: 0, j: 4 },
      },
    }

    const elToCell = {
      id: 'cell-0-7',
    }

    const result = doCastling(state as GameState, elToCell as Element)

    expect(result?.newState).toBeDefined()
    expect(result?.isCastleLegal).toBe(true)
  })

  test('does not perform castling when not legal', () => {
    const pieces = gPieces
    const state = {
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
          '',
          pieces.PAWN_BLACK,
          pieces.PAWN_BLACK,
        ],
        ['', '', '', '', '', '', '', ''],
        [
          pieces.PAWN_BLACK,
          '',
          pieces.BISHOP_BLACK,
          '',
          '',
          pieces.KNIGHT_BLACK,
          '',
          '',
        ],
        ['', '', pieces.QUEEN_WHITE, '', '', '', '', ''],
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
          '',
          pieces.KING_WHITE,
          pieces.BISHOP_WHITE,
          pieces.KNIGHT_WHITE,
          pieces.ROOK_WHITE,
        ],
      ],
      selectedCellCoord: { i: 0, j: 4 },
      isCastlingLegal: {
        whiteKing: true,
        whiteRightSide: true,
        blackLeftSide: true,
        blackRightSide: true,
        blackKing: true,
      },
      isWhiteKingThreatened: false,
      isBlackTurn: true,
      pieces,
      kingPos: {
        white: { i: 0, j: 4 },
      },
    }

    const elToCell = {
      id: 'cell-0-7',
    }
    const result = doCastling(state as GameState, elToCell as Element)

    expect(result?.newState).toBeDefined()
    expect(result?.isCastleLegal).toBe(false)
  })
})
