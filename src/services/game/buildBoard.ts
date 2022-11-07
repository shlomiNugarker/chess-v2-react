export function buildBoard(pieces: any): string[][] {
  const board: string[][] = []
  for (let i = 0; i < 8; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      let piece = ''
      if (i === 1) piece = pieces.PAWN_BLACK
      if (i === 6) piece = pieces.PAWN_WHITE
      board[i][j] = piece
    }
  }

  board[0][0] = board[0][7] = pieces.ROOK_BLACK
  board[0][1] = board[0][6] = pieces.KNIGHT_BLACK
  board[0][2] = board[0][5] = pieces.BISHOP_BLACK
  board[0][3] = pieces.QUEEN_BLACK
  board[0][4] = pieces.KING_BLACK

  board[7][0] = board[7][7] = pieces.ROOK_WHITE
  board[7][1] = board[7][6] = pieces.KNIGHT_WHITE
  board[7][2] = board[7][5] = pieces.BISHOP_WHITE
  board[7][3] = pieces.QUEEN_WHITE
  board[7][4] = pieces.KING_WHITE

  return board
}
