import { GameState } from '../models/GameState'
import { chatService } from './chatService'
import { buildBoard } from './game/buildBoard'
import { gPieces } from './game/gPieces'
import { httpService } from './httpService'

export const gameStateService = {
  getById,
  saveState,
  getNewGame,
}

async function saveState(state: GameState) {
  if (state._id) {
    return await httpService.put(`game/${state._id}`, state)
  }
  if (!state._id) {
    try {
      const newChat = await chatService.createChat() // create new chat for tha game
      state.chatId = newChat._id
      const newState = await httpService.post('game', state)
      return newState
    } catch (err) {
      console.log(err)
    }
  }
}

async function getById(id: string) {
  return await httpService.get(`game/${id}`)
}

function getNewGame(firstPlayerId: string, isOnline: boolean): GameState {
  return {
    isOnline,
    isGameStarted: false,
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
    remainingTime: { black: 1000 * 60 * 5, white: 1000 * 60 * 5 },
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
