import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from '../../models/GameState'

import { buildBoard } from '../../services/game/buildBoard'
import { gPieces } from '../../services/game/gPieces'
import { getJoke } from './asyncActions'

const initialState: GameState = {
  players: null,
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

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedCellCoord: (state, action) => {
      state.selectedCellCoord = action.payload
    },
    setSwitchTurn: (state) => {
      state.isBlackTurn = !state.isBlackTurn
    },
    setKingPos: (state, action) => {
      state.kingPos = action.payload
    },
    setIsBlackKingThreatened: (state, action) => {
      state.isBlackKingThreatened = action.payload
    },
    setIsWhiteKingThreatened: (state, action) => {
      state.isWhiteKingThreatened = action.payload
    },

    setNewState: (state, action) => {
      state.board = action.payload.board
      state.selectedCellCoord = action.payload.selectedCellCoord
      state.isWhiteKingThreatened = action.payload.isWhiteKingThreatened
      state.isBlackKingThreatened = action.payload.isBlackKingThreatened
      state.isBlackTurn = action.payload.isBlackTurn

      state.eatableCellAfterTwoStepsPawnWhite =
        action.payload.eatableCellAfterTwoStepsPawnWhite

      state.eatableCellAfterTwoStepsPawnBlack =
        action.payload.eatableCellAfterTwoStepsPawnBlack

      state.kingPos = action.payload.kingPos
      state.eatenPieces = action.payload.eatenPieces
      state.isCastlingLegal = action.payload.isCastlingLegal
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getJoke.pending, (state, action) => {
        console.log('panding')
      })
      .addCase(getJoke.fulfilled, (state, action) => {
        console.log('fulfilled:', action.payload)
      })
      .addCase(getJoke.rejected, (state, action: PayloadAction<any>) => {
        console.log('rejected:', action.payload)
      })
  },
})

export const {
  setSelectedCellCoord,
  setNewState,
  setSwitchTurn,
  setKingPos,
  setIsBlackKingThreatened,
  setIsWhiteKingThreatened,
} = gameSlice.actions
export default gameSlice.reducer
