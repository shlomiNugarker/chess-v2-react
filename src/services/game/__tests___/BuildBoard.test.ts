import { chess } from '../service'

describe('buildBoard', () => {
  test('builds the initial chess board correctly', () => {
    const pieces = chess.gPieces

    const expectedBoard: string[][] = [
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
    ]

    const result = chess.buildBoard(pieces)

    expect(result).toEqual(expectedBoard)
  })
})
