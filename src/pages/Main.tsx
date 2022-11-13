import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'
import { RootState } from '../features'
import { getState, updateState } from '../features/game/asyncActions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'

export const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [isTwoPlayerInTheGame, setIsTwoPlayerInTheGame] = useState(false)

  const { id } = useParams()

  const joinPlayerToTheGame = () => {
    // if no black player:
    if (gameState?.players?.white && gameState?.players?.black === '') {
      console.log('white player joined')
      const stateToUpdate = _.cloneDeep(gameState)

      if (stateToUpdate.players) {
        const userId = authState.loggedInUser?._id
        // if player exist: return
        if (gameState.players.white === userId) {
          return
        }

        if (!userId) {
          alert('please login')
          return
        }

        stateToUpdate.players.black = userId
      }
      return stateToUpdate
    }

    // if no white player:
    else if (gameState?.players?.black && gameState?.players?.white === '') {
      console.log('black player joined')
      const stateToUpdate = _.cloneDeep(gameState)

      if (stateToUpdate.players) {
        const userId = authState.loggedInUser?._id
        // if player exist: return
        if (gameState.players.black === userId) {
          return
        }

        if (!userId) {
          alert('please login')
          return
        }

        stateToUpdate.players.white = userId
      }

      return stateToUpdate
    }
  }

  useEffect(() => {
    if (!gameState?.players?.black || !gameState?.players?.white) {
      const stateToUpdate = joinPlayerToTheGame()
      stateToUpdate && dispatch(updateState(stateToUpdate))
    }
    if (gameState?.players?.black && gameState?.players?.white) {
      setIsTwoPlayerInTheGame(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    gameState,
    gameState?.players?.black,
    gameState?.players?.white,
    authState.loggedInUser,
  ])

  useEffect(() => {
    if (id) dispatch(getState(id))
  }, [dispatch, id])

  return (
    <div className="main-page">
      {!isTwoPlayerInTheGame && (
        <p className="is-waiting">Waiting for a player...</p>
      )}
      {gameState && (
        <Board
          isTwoPlayerInTheGame={isTwoPlayerInTheGame}
          setIsTwoPlayerInTheGame={setIsTwoPlayerInTheGame}
        />
      )}

      {!gameState && (
        <div className="msg">
          <p>Did not found a game..</p>
          <button onClick={() => navigate('/')}>Go home</button>
        </div>
      )}
    </div>
  )
}
