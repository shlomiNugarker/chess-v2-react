export interface GameState {
  stateHistory: GameState[]
  boardHistory: string[][][]
  board: string[][]
  pieces: {
    KING_WHITE: string
    KING_BLACK: string
    BISHOP_WHITE: string
    BISHOP_BLACK: string
    PAWN_WHITE: string
    PAWN_BLACK: string
    QUEEN_WHITE: string
    QUEEN_BLACK: string
    ROOK_WHITE: string
    ROOK_BLACK: string
    KNIGHT_WHITE: string
    KNIGHT_BLACK: string
  }
  selectedCellCoord: { i: number; j: number } | null
  isWhiteKingThreatened: boolean
  isBlackKingThreatened: boolean
  isBlackTurn: boolean
  eatableCellAfterTwoStepsPawnWhite: { i: number; j: number } | null
  eatableCellAfterTwoStepsPawnBlack: { i: number; j: number } | null
  kingPos: {
    black: { i: number; j: number }
    white: { i: number; j: number }
  }
  eatenPieces: {
    black: string[]
    white: string[]
  }
  isCastlingLegal: {
    whiteLeftSide: boolean
    whiteRightSide: boolean
    whiteKing: boolean
    blackLeftSide: boolean
    blackRightSide: boolean
    blackKing: boolean
  }
}
