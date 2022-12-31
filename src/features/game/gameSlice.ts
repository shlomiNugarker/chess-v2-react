import { createSlice } from '@reduxjs/toolkit'
import { GameState } from '../../models/GameState'
import { getState, setNewState, updateState } from './asyncActions'

const initialState: GameState | null = null

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState as GameState | null,
  reducers: {
    setSelectedCellCoord: (state, action) => {
      if (!state) return
      state.selectedCellCoord = action.payload
    },
    setSwitchTurn: (state) => {
      if (!state) return
      state.isBlackTurn = !state.isBlackTurn
    },
    setKingPos: (state, action) => {
      if (!state) return
      state.kingPos = action.payload
    },
    setIsBlackKingThreatened: (state, action) => {
      if (!state) return
      state.isBlackKingThreatened = action.payload
    },
    setIsGameStarted: (state) => {
      if (!state) return
      state.isGameStarted = true
    },
    setIsWhiteKingThreatened: (state, action) => {
      if (!state) return
      state.isWhiteKingThreatened = action.payload
    },
    updateTime: (state, action) => {
      if (!state) return
      state.remainingTime = action.payload
    },
    updateStateFromSocket: (state, action) => {
      if (!state) return
      state.board = action.payload.board
      state.selectedCellCoord = action.payload.selectedCellCoord
      state.isGameStarted = action.payload.isGameStarted
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
      state.players = action.payload.players
      state.remainingTime = action.payload.remainingTime
    },
  },
  extraReducers(builder) {
    builder.addCase(setNewState.fulfilled, (state, action) => {})
    builder.addCase(updateState.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
    builder.addCase(getState.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
  },
})

export const {
  setSelectedCellCoord,
  updateStateFromSocket,
  setSwitchTurn,
  setKingPos,
  setIsBlackKingThreatened,
  setIsWhiteKingThreatened,
  updateTime,
  setIsGameStarted,
} = gameSlice.actions
export default gameSlice.reducer
