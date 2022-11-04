import _ from 'lodash'
import { GameState } from '../../features/game/gameSlice'
import { getCellCoord } from './main'

export function doCastling(state: GameState, elToCell: Element) {
  const fromCoord = state.selectedCellCoord
  const toCoord = getCellCoord(elToCell.id)
  if (!fromCoord) return
  let kingPiece: string = ''
  let newKingCell: { i: number; j: number } | null = null

  let copiedState = _.cloneDeep(state)

  // WHITE KING:
  if (
    state.board[toCoord.i][toCoord.j] === state.pieces.KING_WHITE &&
    state.isCastlingLegal.white
  ) {
    const rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
    kingPiece = copiedState.board[toCoord.i][toCoord.j]

    copiedState.board[fromCoord.i][fromCoord.j] = ''
    copiedState.board[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0) {
      copiedState.board[7][3] = rookPiece
      copiedState.board[7][2] = kingPiece
      newKingCell = { i: 7, j: 2 }
      copiedState.kingPos.white = newKingCell
    }
    //
    else if (fromCoord.j === 7) {
      copiedState.board[7][5] = rookPiece
      copiedState.board[7][6] = kingPiece
      newKingCell = { i: 7, j: 6 }
      copiedState.kingPos.white = newKingCell
    }
  } else if (
    state.board[toCoord.i][toCoord.j] === state.pieces.ROOK_WHITE &&
    state.isCastlingLegal.white
  ) {
    // const rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
    // kingPiece = copiedState.board[toCoord.i][toCoord.j]
    // copiedState.board[fromCoord.i][fromCoord.j] = ''
    // copiedState.board[toCoord.i][toCoord.j] = ''
    // if (fromCoord.j === 0) {
    //   copiedState.board[7][3] = rookPiece
    //   copiedState.board[7][2] = kingPiece
    //   newKingCell = { i: 7, j: 2 }
    //   copiedState.kingPos.white = newKingCell
    // }
    // //
    // else if (fromCoord.j === 7) {
    //   copiedState.board[7][5] = rookPiece
    //   copiedState.board[7][6] = kingPiece
    //   newKingCell = { i: 7, j: 6 }
    //   copiedState.kingPos.white = newKingCell
    // }
  }

  // BLACK KING:

  // if (
  //   state.board[toCoord.i][toCoord.j] === state.pieces.KING_BLACK &&
  //   state.isCastlingLegal.black
  // ) {
  //   const rookPiece = copiedState.board[fromCoord.i][fromCoord.j]
  //   kingPiece = copiedState.board[toCoord.i][toCoord.j]

  //   copiedState.board[fromCoord.i][fromCoord.j] = ''
  //   copiedState.board[toCoord.i][toCoord.j] = ''

  //   if (fromCoord.j === 0) {
  //     copiedState.board[0][3] = rookPiece
  //     copiedState.board[0][2] = kingPiece
  //     newKingCell = { i: 0, j: 2 }
  //     copiedState.kingPos.white = newKingCell
  //   }
  //   //
  //   else if (fromCoord.j === 7) {
  //     copiedState.board[0][5] = rookPiece
  //     copiedState.board[0][6] = kingPiece
  //     newKingCell = { i: 0, j: 6 }
  //     copiedState.kingPos.white = newKingCell
  //   }
  // }

  return copiedState
}

// TODO: create a func that check every cell between the king & rook if they are threatened
