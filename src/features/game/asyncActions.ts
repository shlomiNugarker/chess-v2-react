import { createAsyncThunk } from '@reduxjs/toolkit'
import { GameState } from '../../models/GameState'
import { gameStateService } from '../../services/gameStateService'
import { socketService } from '../../services/socketService'
import { storageService } from '../../services/storageService'

// ACTION

export const setNewState = createAsyncThunk(
  'game/setNewState',
  async (newState: GameState, thunkApi) => {
    try {
      // if game is offline mode, save in local storage
      if (!newState.isOnline) {
        const stateWithId: GameState = storageService.post(
          'chess-game',
          newState
        )
        return stateWithId
      }
      // just save new state in DB and after the page navigate, load the game with the param id (getGame)
      const savedState: GameState = await gameStateService.saveState(newState)
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
      // first, look in local storage
      const stateFromStorage = storageService.get('chess-game', gameId)
      if (stateFromStorage) return stateFromStorage
      // look in DB
      const state = await gameStateService.getById(gameId)
      return state
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
      // if offline, updating local storage
      if (!newState.isOnline) {
        const updatedState = storageService.put('chess-game', newState)
        return updatedState
      }
      // else updating the DB
      const savedState = await gameStateService.saveState(newState)
      socketService.emit('state-updated', savedState)
      return savedState
    } catch (err: any) {
      console.log(err)
      return thunkApi.rejectWithValue(err.message)
    }
  }
)
