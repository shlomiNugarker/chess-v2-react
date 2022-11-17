import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'
import { GameDetails } from '../cmps/GameDetails'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { RootState } from '../features'
import { getState, updateState } from '../features/game/asyncActions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { Chat } from './Chat'

interface props {
  onLoginAsGuest: any
}
export const Main = ({ onLoginAsGuest }: props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [isTwoPlayerInTheGame, setIsTwoPlayerInTheGame] = useState(false)
  const { id } = useParams()

  const onShareGameUrl = async () => {
    const shareData = {
      title: 'Chess game',
      text: `${authState.loggedInUser?.fullname} invited you to play chess !`,
      url: `https://ichess.onrender.com/#/${id}`,
    }

    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  const joinPlayerToTheGame = () => {
    // if no black player:
    if (gameState?.players?.white && gameState?.players?.black === '') {
      const stateToUpdate = _.cloneDeep(gameState)
      if (stateToUpdate.players) {
        const userId = authState.loggedInUser?._id
        // if player exist: return
        if (gameState.players.white === userId) return
        if (!userId) {
          // alert('please login')
          return
        }
        stateToUpdate.players.black = userId
      }
      return stateToUpdate
    }
    // if no white player:
    else if (gameState?.players?.black && gameState?.players?.white === '') {
      const stateToUpdate = _.cloneDeep(gameState)

      if (stateToUpdate.players) {
        const userId = authState.loggedInUser?._id
        // if player exist: return
        if (gameState.players.black === userId) return
        if (!userId) {
          // alert('please login')
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
    // eslint-disable-next-line
  }, [
    dispatch,
    gameState,
    gameState?.players?.black,
    gameState?.players?.white,
    authState.loggedInUser,
    gameState?.isOnline,
  ])

  useEffect(() => {
    if (id) dispatch(getState(id))
  }, [dispatch, id])

  function copyToClipBoard() {
    navigator.clipboard.writeText(`https://ichess.onrender.com/#/${id}`)
  }

  return (
    <div className="main-page">
      {gameState?.isOnline && !isTwoPlayerInTheGame && (
        <div className="wait-container">
          <p className="is-waiting">Waiting for a player...</p>
          <p className="is-waiting" onClick={copyToClipBoard}>
            Share this link for play <span>click to copy </span>
          </p>
          <button className="share-btn " onClick={onShareGameUrl}>
            Share
          </button>
        </div>
      )}

      {gameState && (
        <Board
          isTwoPlayerInTheGame={isTwoPlayerInTheGame}
          setIsTwoPlayerInTheGame={setIsTwoPlayerInTheGame}
        />
      )}

      {gameState && <GameDetails />}

      {gameState && <Chat />}

      {!gameState && (
        <div className="msg">
          <p>Did not found a game..</p>
          <button onClick={() => navigate('/')}>Go home</button>
        </div>
      )}

      {!authState.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
