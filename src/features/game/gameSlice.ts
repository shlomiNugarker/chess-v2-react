import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { buildBoard } from '../../services/game/main'

// ACTION
// export const getJoke = createAsyncThunk(
//   'game/getJoke',
//   async (data, thunkApi) => {
//     try {
//       const res = await fetch('https://api.chucknorris.io/jokes/random')
//       const data = await res.json()
//       return data.value
//     } catch (err: any) {
//       console.log(err)
//       return thunkApi.rejectWithValue(err.message)
//     }
//   }
// )

export interface GameState {
  board: string[][]
  pieces: {
    KING_WHITE: string
    KING_BLACK: string
    BISHOP_WHITE: string
    BISHOP_BLACK: string
    PAWN_WHITE: string
    PAWN_BLACK: string
    QUEEN_WHITE: string
    QUEEN_BLACK: string
    ROOK_WHITE: string
    ROOK_BLACK: string
    KNIGHT_WHITE: string
    KNIGHT_BLACK: string
  }
  selectedCellCoord: { i: number; j: number } | null
  isWhiteKingThreatened: boolean
  isBlackKingThreatened: boolean
  isBlackTurn: boolean
  kingPos: {
    black: { i: number; j: number }
    white: { i: number; j: number }
  }
  eatenPieces: {
    black: string[]
    white: string[]
  }
  isCastlingLegal: {
    whiteLeftSide: boolean
    whiteRightSide: boolean
    whiteKing: boolean
    blackLeftSide: boolean
    blackRightSide: boolean
    blackKing: boolean
  }
  // isCastlingLegal: {
  //   white: boolean
  //   black: boolean
  // }
}

export const gPieces = {
  KING_WHITE: '♔',
  KING_BLACK: '♚',
  BISHOP_WHITE: '♗',
  BISHOP_BLACK: '♝',
  PAWN_WHITE: '♙',
  PAWN_BLACK: '♟',
  QUEEN_WHITE: '♕',
  QUEEN_BLACK: '♛',
  ROOK_WHITE: '♖',
  ROOK_BLACK: '♜',
  KNIGHT_WHITE: '♘',
  KNIGHT_BLACK: '♞',
}

const initialState: GameState = {
  board: buildBoard(gPieces),
  pieces: gPieces,
  selectedCellCoord: null,
  isWhiteKingThreatened: false,
  isBlackKingThreatened: false,
  isBlackTurn: false,
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
  // isCastlingLegal: {
  //   white: true,
  //   black: true,
  // },
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
      console.log('setIsBlackKingThreatened', action.payload)
      state.isBlackKingThreatened = action.payload
    },
    setIsWhiteKingThreatened: (state, action) => {
      console.log('setIsWhiteKingThreatened', action.payload)

      state.isWhiteKingThreatened = action.payload
    },
    setNewState: (state, action) => {
      state.board = action.payload.board
      state.selectedCellCoord = action.payload.selectedCellCoord
      state.isWhiteKingThreatened = action.payload.isWhiteKingThreatened
      state.isBlackKingThreatened = action.payload.isBlackKingThreatened
      state.isBlackTurn = action.payload.isBlackTurn
      state.kingPos = action.payload.kingPos
      state.board = action.payload.board
      state.eatenPieces = action.payload.eatenPieces
      state.isCastlingLegal = action.payload.isCastlingLegal
    },
  },

  extraReducers(builder) {
    // builder
    // .addCase(getJoke.pending, (state, action) => {
    //   state.isLoading = true
    // })
    // .addCase(getJoke.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.joke = action.payload
    // })
    // .addCase(getJoke.rejected, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false
    //   console.log(action.payload)
    // })
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
