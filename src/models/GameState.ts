/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GameState {
  isOnline: boolean
  isGameStarted: boolean
  players: {
    black: string
    white: string
  } | null
  stateHistory: GameState[]
  boardHistory: string[][][]
  board: string[][]
  pieces: {
    KING_WHITE: any
    KING_BLACK: any
    BISHOP_WHITE: any
    BISHOP_BLACK: any
    PAWN_WHITE: any
    PAWN_BLACK: any
    QUEEN_WHITE: any
    QUEEN_BLACK: any
    ROOK_WHITE: any
    ROOK_BLACK: any
    KNIGHT_WHITE: any
    KNIGHT_BLACK: any
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
  remainingTime: { black: number; white: number }
  _id?: string
  createdAt?: number
  chatId?: string
}
