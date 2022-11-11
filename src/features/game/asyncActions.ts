import { createAsyncThunk } from '@reduxjs/toolkit'
import { GameState } from '../../models/GameState'
import { gameService } from '../../services/gameService'

// ACTION

// export const setNewState = createAsyncThunk(
//   'game/setNewState',
//   async (newState: GameState, thunkApi) => {
//     try {
//       const savedState = await gameService.saveState(newState)
//       return savedState
//     } catch (err: any) {
//       console.log(err)
//       return thunkApi.rejectWithValue(err.message)
//     }
//   }
// )
