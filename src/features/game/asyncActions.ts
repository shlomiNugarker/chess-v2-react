import { createAsyncThunk } from '@reduxjs/toolkit'
import { GameState } from '../../models/GameState'
import { gameStateService } from '../../services/gameStateService'
import { socketService } from '../../services/socketService'

// ACTION

export const setNewState = createAsyncThunk(
  'game/setNewState',
  async (newState: GameState, thunkApi) => {
    try {
      // just save new state in DB and after the page navigate, load the game with the param id (getGame)
      const savedState = await gameStateService.saveState(newState)
      return savedState
    } catch (err: any) {
      console.log(err)
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const getState = createAsyncThunk(
  'game/getGame',
  async (gameId: string, thunkApi) => {
    try {
      const savedState = await gameStateService.getById(gameId)
      return savedState
    } catch (err: any) {
      console.log(err)
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const updateState = createAsyncThunk(
  'game/updateState',
  async (newState: GameState, thunkApi) => {
    try {
      const savedState = await gameStateService.saveState(newState)
      socketService.emit('state-updated', savedState)
      return savedState
    } catch (err: any) {
      console.log(err)
      return thunkApi.rejectWithValue(err.message)
    }
  }
)
