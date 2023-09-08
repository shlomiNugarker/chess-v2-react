import { GameState } from './GameState'

export type UpdateGameState = (
  newState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => Promise<void>
