import { GameState } from '../models/GameState'
import { buildBoard } from './game/buildBoard'
import { gPieces } from './game/gPieces'
import { httpService } from './httpService'

export const gameStateService = {
  getById,
  saveState,
  getNewGame,
}

async function saveState(state: GameState) {
  return state._id
    ? await httpService.put(`game/${state._id}`, state)
    : await httpService.post('game', state)
}

async function getById(id: string) {
  return await httpService.get(`game/${id}`)
}

function getNewGame(firstPlayerId: string, isOnline: boolean): GameState {
  return {
    isOnline,
    players: { white: firstPlayerId, black: '' },
    stateHistory: [],
    boardHistory: [],
    board: buildBoard(gPieces),
    pieces: gPieces,
    selectedCellCoord: null,
    isWhiteKingThreatened: false,
    isBlackKingThreatened: false,
    isBlackTurn: false,
    eatableCellAfterTwoStepsPawnWhite: null,
    eatableCellAfterTwoStepsPawnBlack: null,
    kingPos: {
      black: { i: 0, j: 4 },
      white: { i: 7, j: 4 },
    },
    eatenPieces: {
      black: [],
      white: [],
    },
    isCastlingLegal: {
      whiteLeftSide: true,
      whiteRightSide: true,
      whiteKing: true,
      blackLeftSide: true,
      blackRightSide: true,
      blackKing: true,
    },
  }
}
