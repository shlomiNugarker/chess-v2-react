import _ from 'lodash'
import { GameState } from '../../features/game/gameSlice'
import { checkIfKingThreatened } from './checkIfKingThreatened'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKing } from './possibleCoordsFuncs/getAllPossibleCoordsKing'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsPawn } from './possibleCoordsFuncs/getAllPossibleCoordsPawn'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'

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

export function isEmptyCell(
  board: string[][],
  coord: { i: number; j: number }
) {
  return board[coord.i][coord.j] === ''
}

export function isColorPieceWorthCurrPlayerColor(
  state: GameState,
  piece: string
) {
  return state.isBlackTurn === isBlackPiece(state, piece)
}

export function getPossibleCoords(
  state: GameState,
  piece: string,
  cellCoord: {
    i: number
    j: number
  }
) {
  if (!piece) return

  let possibleCoords: { i: number; j: number }[] = []
  switch (piece) {
    case state.pieces.PAWN_BLACK:
    case state.pieces.PAWN_WHITE:
      console.log('getAllPossibleCoordsPawn')
      possibleCoords = getAllPossibleCoordsPawn(
        state,
        cellCoord,
        piece === state.pieces.PAWN_WHITE
      )
      break
    case state.pieces.BISHOP_BLACK:
    case state.pieces.BISHOP_WHITE:
      console.log('getAllPossibleCoordsBishop')
      possibleCoords = getAllPossibleCoordsBishop(state, cellCoord)
      break
    case state.pieces.KING_BLACK:
    case state.pieces.KING_WHITE:
      console.log('getAllPossibleCoordsKing')
      possibleCoords = getAllPossibleCoordsKing(state, cellCoord)
      break
    case state.pieces.KNIGHT_BLACK:
    case state.pieces.KNIGHT_WHITE:
      console.log('getAllPossibleCoordsKnight')
      possibleCoords = getAllPossibleCoordsKnight(state, cellCoord)
      break
    case state.pieces.QUEEN_BLACK:
    case state.pieces.QUEEN_WHITE:
      console.log('getAllPossibleCoordsQueen')
      possibleCoords = getAllPossibleCoordsQueen(state, cellCoord)
      break
    case state.pieces.ROOK_BLACK:
    case state.pieces.ROOK_WHITE:
      console.log('getAllPossibleCoordsRook')
      possibleCoords = getAllPossibleCoordsRook(state, cellCoord)
      break
  }
  return possibleCoords
}

export function isBlackPiece(
  state: GameState,
  piece: string
): boolean | undefined {
  switch (piece) {
    case state.pieces.KING_WHITE:
      return false

    case state.pieces.BISHOP_WHITE:
      return false

    case state.pieces.PAWN_WHITE:
      return false

    case state.pieces.QUEEN_WHITE:
      return false

    case state.pieces.ROOK_WHITE:
      return false

    case state.pieces.KNIGHT_WHITE:
      return false

    case state.pieces.KING_BLACK:
      return true

    case state.pieces.BISHOP_BLACK:
      return true

    case state.pieces.PAWN_BLACK:
      return true

    case state.pieces.QUEEN_BLACK:
      return true

    case state.pieces.ROOK_BLACK:
      return true

    case state.pieces.KNIGHT_BLACK:
      return true

    default:
      return undefined
  }
}

export function markCells(
  state: GameState,
  coords: { i: number; j: number }[]
) {
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    let elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return

    const piece = state.board[coord.i][coord.j]

    if (isColorPieceWorthCurrPlayerColor(state, piece)) {
      elCell.classList.add('castle')
    }
    //
    else if (state.board[coord.i][coord.j]) {
      elCell.classList.add('eatable')
    }
    //
    else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}

export function cleanBoard() {
  const elTds = document.querySelectorAll('.mark, .selected, .eatable, .castle')

  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castle')
  }
}

export function movePiece(
  state: GameState,
  toCellCoord: {
    i: number
    j: number
  }
) {
  const fromCoord = state.selectedCellCoord
  const toCoord = toCellCoord

  const isKingMoved =
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.KING_WHITE) ||
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.KING_BLACK)

  const isRookMoved =
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_WHITE) ||
    (fromCoord &&
      state.board[fromCoord.i][fromCoord.j] === state.pieces.ROOK_BLACK)

  const isCellWithPiece = state.board[toCoord.i][toCoord.j]

  if (!fromCoord) return

  let copiedState = _.cloneDeep(state)

  if (isCellWithPiece) {
    // Eat !
    const eatenPiece = copiedState.board[toCoord.i][toCoord.j]
    if (isBlackPiece(copiedState, eatenPiece) === true) {
      copiedState.eatenPieces.white.push(eatenPiece)
    } else if (isBlackPiece(copiedState, eatenPiece) === false) {
      copiedState.eatenPieces.black.push(eatenPiece)
    }
  }

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = ''
  copiedState.board[toCoord.i][toCoord.j] = piece

  if (isKingMoved) {
    copiedState = updateKingPos(copiedState, toCoord, piece)

    if (copiedState.isBlackTurn) {
      copiedState.isCastlingLegal.blackKing = false
    } else if (!copiedState.isBlackTurn) {
      copiedState.isCastlingLegal.whiteKing = false
    }
  }

  if (isRookMoved) {
    if (fromCoord.j === 0) {
      state.isBlackTurn
        ? (copiedState.isCastlingLegal.blackLeftSide = false)
        : (copiedState.isCastlingLegal.whiteLeftSide = false)
    } else if (fromCoord.j === 7) {
      state.isBlackTurn
        ? (copiedState.isCastlingLegal.blackRightSide = false)
        : (copiedState.isCastlingLegal.whiteRightSide = false)
    }
  }

  return copiedState
}

export function isNextStepLegal(
  state: GameState,
  elToCell: HTMLElement | Element
) {
  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)

  if (!fromCoord) return { isMoveLegal: false, state }

  const copiedState: GameState = _.cloneDeep(state)

  const isKingMoved =
    copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.KING_WHITE ||
    copiedState.board[fromCoord.i][fromCoord.j] === state.pieces.KING_BLACK

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = ''
  copiedState.board[toCoord.i][toCoord.j] = piece

  if (isKingMoved) {
    if (piece === state.pieces.KING_WHITE) {
      copiedState.kingPos.white = { i: toCoord.i, j: toCoord.j }
      copiedState.isCastlingLegal.whiteLeftSide = false
      copiedState.isCastlingLegal.whiteRightSide = false
    }
    if (piece === state.pieces.KING_BLACK) {
      copiedState.kingPos.black = { i: toCoord.i, j: toCoord.j }
      copiedState.isCastlingLegal.blackLeftSide = false
      copiedState.isCastlingLegal.blackRightSide = false
    }
  }
  const { isThreatened, state: state2 } = checkIfKingThreatened(
    copiedState,
    true
  )
  return { isMoveLegal: !isThreatened, state: state2 }
  // return { isMoveLegal: !isThreatened, state: copiedState }
}

export function getCellCoord(strCellId: string) {
  const parts = strCellId.split('-')
  const coord = { i: +parts[1], j: +parts[2] }
  return coord
}

export function paintKingCellToRed(kingPos: { i: number; j: number }) {
  document
    .querySelector(`#cell-${kingPos.i}-${kingPos.j}`)
    ?.classList.add('red')
}

export function updateKingPos(
  state: GameState,
  toCoord: { i: number; j: number },
  piece: string
) {
  if (piece === '♔') {
    state.kingPos.white = { i: toCoord.i, j: toCoord.j }
  }
  if (piece === '♚') {
    state.kingPos.black = { i: toCoord.i, j: toCoord.j }
  }
  return state
}

export function isOptionToCastling(
  state: GameState,
  pieceToCastling: string,
  selectedPieceCoord: {
    i: number
    j: number
  }
) {
  if (!state.selectedCellCoord) return false

  const currPiece = state.board[selectedPieceCoord.i][selectedPieceCoord.j]

  if (
    (pieceToCastling === state.pieces.KING_WHITE &&
      currPiece === state.pieces.ROOK_WHITE) ||
    (pieceToCastling === state.pieces.ROOK_WHITE &&
      currPiece === state.pieces.KING_WHITE) ||
    (pieceToCastling === state.pieces.KING_BLACK &&
      currPiece === state.pieces.ROOK_BLACK) ||
    (pieceToCastling === state.pieces.ROOK_BLACK &&
      currPiece === state.pieces.KING_BLACK)
  ) {
    return true
  }
  return false
}
