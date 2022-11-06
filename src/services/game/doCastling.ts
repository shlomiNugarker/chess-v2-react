import _ from 'lodash'
import { GameState } from '../../features/game/gameSlice'
import { getCellCoord } from './main'

export function doCastling(state: GameState, elToCell: Element) {
  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)
  if (!fromCoord) return

  let kingPiece: string = ''
  let newKingCoords: { i: number; j: number } | null = null
  let rookPiece: string
  let rookCoords: { i: number; j: number }

  let copiedState = _.cloneDeep(state)

  // WHITE KING:
  if (
    state.board[toCoord.i][toCoord.j] === state.pieces.KING_WHITE ||
    state.board[toCoord.i][toCoord.j] === state.pieces.ROOK_WHITE
  ) {
    if (
      copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_WHITE
    ) {
      rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
      kingPiece = copiedState.board[toCoord.i][toCoord.j]
      rookCoords = fromCoord
    } else {
      rookPiece = copiedState.board[toCoord.i][toCoord.j]
      kingPiece = copiedState.board[fromCoord.i][fromCoord.j]
      rookCoords = toCoord
    }

    if (rookCoords.j === 0 && !state.isCastlingLegal.whiteLeftSide) {
      console.log('cant castle this rook:', { rookCoords })
      return
    }
    if (rookCoords.j === 7 && !state.isCastlingLegal.whiteRightSide) {
      console.log('cant castle this rook:', { rookCoords })
      return
    }

    if (!state.isCastlingLegal.whiteKing) {
      console.log('cant castle, king alredy moved')
      return
    }

    if (state.isWhiteKingThreatened) {
      console.log('you cant castle')
      return
    }

    copiedState.board[fromCoord.i][fromCoord.j] = ''
    copiedState.board[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0 && toCoord.j === 4) {
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCoords = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCoords = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCoords
    }
    copiedState.isCastlingLegal.whiteKing = false
  }

  // BLACK KING:
  if (
    state.board[toCoord.i][toCoord.j] === state.pieces.KING_BLACK ||
    state.board[toCoord.i][toCoord.j] === state.pieces.ROOK_BLACK
  ) {
    if (
      copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_BLACK
    ) {
      rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
      kingPiece = copiedState.board[toCoord.i][toCoord.j]
      rookCoords = fromCoord
    } else {
      rookPiece = copiedState.board[toCoord.i][toCoord.j]
      kingPiece = copiedState.board[fromCoord.i][fromCoord.j]
      rookCoords = toCoord
    }

    if (rookCoords.j === 0 && !state.isCastlingLegal.blackLeftSide) {
      console.log('cant castle this rook:', { rookCoords })
      return
    }
    if (rookCoords.j === 7 && !state.isCastlingLegal.blackRightSide) {
      console.log('cant castle this rook:', { rookCoords })
      return
    }

    if (!state.isCastlingLegal.blackKing) {
      console.log('cant castle, king already moved')
      return
    }

    if (state.isBlackKingThreatened) {
      console.log('you cant castle')
      return
    }

    copiedState.board[fromCoord.i][fromCoord.j] = ''
    copiedState.board[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0 && toCoord.j === 4) {
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    }
    copiedState.isCastlingLegal.blackKing = false
  }

  return copiedState
}

// TODO: create a func that check every cell between the king & rook if they are threatened
