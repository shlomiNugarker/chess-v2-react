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
  let possibleCoords: { i: number; j: number }[] = []
  switch (piece) {
    case state.pieces.PAWN_BLACK:
    case state.pieces.PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(
        state,
        cellCoord,
        piece === state.pieces.PAWN_WHITE
      )
      break
    case state.pieces.BISHOP_BLACK:
    case state.pieces.BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(state, cellCoord)
      break
    case state.pieces.KING_BLACK:
    case state.pieces.KING_WHITE:
      possibleCoords = getAllPossibleCoordsKing(state, cellCoord)
      break
    case state.pieces.KNIGHT_BLACK:
    case state.pieces.KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(state, cellCoord)
      break
    case state.pieces.QUEEN_BLACK:
    case state.pieces.QUEEN_WHITE:
      possibleCoords = getAllPossibleCoordsQueen(state, cellCoord)
      break
    case state.pieces.ROOK_BLACK:
    case state.pieces.ROOK_WHITE:
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
      elCell.classList.add('castling')
    } else if (state.board[coord.i][coord.j]) {
      elCell.classList.add('eatable')
    } else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}

export function cleanBoard() {
  const elTds = document.querySelectorAll(
    '.mark, .selected, .eatable, .castling'
  )
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castling')
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
    (fromCoord && state.board[fromCoord.i][fromCoord.j] === '♔') ||
    (fromCoord && state.board[fromCoord.i][fromCoord.j] === '♚')

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
  }

  return copiedState
}

export function isNextStepLegal(
  state: GameState,
  elToCell: HTMLElement | Element
) {
  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)

  if (!fromCoord) return false

  const copiedState: GameState = _.cloneDeep(state)

  const isKingMoved =
    copiedState.board[fromCoord.i][fromCoord.j] === '♔' ||
    copiedState.board[fromCoord.i][fromCoord.j] === '♚'

  const piece = copiedState.board[fromCoord.i][fromCoord.j]
  copiedState.board[fromCoord.i][fromCoord.j] = ''
  copiedState.board[toCoord.i][toCoord.j] = piece

  // if (isKingMoved) {
  //   if (piece === '♔') {
  //     copiedState.kingPos.white = { i: toCoord.i, j: toCoord.j }
  //     copiedState.isCastlingLegal.white = false
  //   }
  //   if (piece === '♚') {
  //     copiedState.kingPos.black = { i: toCoord.i, j: toCoord.j }
  //     copiedState.isCastlingLegal.black = false
  //   }
  // }
  const isKingThreatened = checkIfKingThreatened(copiedState, true)
  return !isKingThreatened
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
