import { GameState } from '../models/GameState'
import { chatService } from './chatService'
import { buildBoard } from './game/buildBoard'
import { gPieces } from './game/gPieces'
import { httpService } from './httpService'
import { storageService } from './storageService'

export const gameStateService = {
  getById,
  saveState,
  getNewGame,
  setNewState,
}

async function saveState(state: GameState) {
  if (state._id) {
    return await httpService.put(`game/${state._id}`, state)
  }
  if (!state._id) {
    try {
      const chatId = await chatService.createChat() // create new chat for tha game

      state.chatId = chatId
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

async function setNewState(state: GameState) {
  try {
    if (!state.isOnline) {
      const stateWithId: GameState = storageService.post('chess-game', state)
      return stateWithId._id
    }
    // just save new state in DB and after the page navigate, load the game with the param id (getGame)
    const stateId: string = await gameStateService.saveState(state)
    return stateId
  } catch (err) {
    console.log(err)
  }
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
