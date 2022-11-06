import _ from 'lodash'
import { GameState } from '../../features/game/gameSlice'
import { checkIfKingThreatened } from './checkIfKingThreatened'
import { getCellCoord } from './main'

export function doCastling(state: GameState, elToCell: Element) {
  console.log('doCastling')

  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)
  if (!fromCoord) return

  let kingPiece: string = ''
  let newKingCoords: { i: number; j: number } | null = null
  let rookPiece: string
  let rookCoords: { i: number; j: number }
  let isCastleLegal: boolean = true

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
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCoords = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCoords = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
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
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 7 && toCoord.j === 4) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 7) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][5] = rookPiece
      copiedState.board[0][6] = kingPiece
      newKingCoords = { i: 0, j: 6 }
      copiedState.kingPos.black = newKingCoords
    } else if (fromCoord.j === 4 && toCoord.j === 0) {
      const isThreatened = isCastleThreatened(state, fromCoord, toCoord)
      if (!isThreatened) {
        isCastleLegal = false
        return { newState: copiedState, isCastleLegal }
      }
      copiedState.board[0][3] = rookPiece
      copiedState.board[0][2] = kingPiece
      newKingCoords = { i: 0, j: 2 }
      copiedState.kingPos.black = newKingCoords
    }
    copiedState.isCastlingLegal.blackKing = false
  }

  return { newState: copiedState, isCastleLegal }
}

// TODO: create a func that check every cell between the king & rook if they are threatened
export function isCastleThreatened(
  state: GameState,
  fromCoord: { i: number; j: number },
  toCoord: { i: number; j: number }
) {
  let isCastleLegal: boolean = true

  let coordsToCheck: {
    i: number
    j: number
  }[] = []

  if (
    (fromCoord.j === 0 && toCoord.j === 4) ||
    (fromCoord.j === 4 && toCoord.j === 0)
  ) {
    if (state.isBlackTurn) {
      coordsToCheck = [
        { i: 0, j: 0 },
        { i: 0, j: 1 },
        { i: 0, j: 2 },
        { i: 0, j: 3 },
      ]
    } else if (!state.isBlackTurn) {
      coordsToCheck = [
        { i: 7, j: 0 },
        { i: 7, j: 1 },
        { i: 7, j: 2 },
        { i: 7, j: 3 },
      ]
    }
  } else if (
    (fromCoord.j === 7 && toCoord.j === 4) ||
    (fromCoord.j === 4 && toCoord.j === 7)
  ) {
    if (state.isBlackTurn) {
      coordsToCheck = [
        { i: 0, j: 5 },
        { i: 0, j: 6 },
        { i: 0, j: 7 },
      ]
    } else if (!state.isBlackTurn) {
      coordsToCheck = [
        { i: 7, j: 5 },
        { i: 7, j: 6 },
        { i: 7, j: 7 },
      ]
    }
  }

  coordsToCheck.forEach((coord) => {
    const { isThreatened } = checkIfKingThreatened(state, true, coord)
    if (isThreatened) {
      console.log('isThreatened', { coord })
      isCastleLegal = !isThreatened
    }
  })

  return isCastleLegal
}
