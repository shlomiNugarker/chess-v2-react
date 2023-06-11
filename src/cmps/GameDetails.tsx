import { useEffect, useState } from 'react'
import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'
import { User } from '../models/User'
import { userService } from '../services/userServise'

export const GameDetails = () => {
  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [whitePlayer, setWhitePlayer] = useState<User | null>(null)
  const [blackPlayer, setBlackPlayer] = useState<User | null>(null)

  const [isWhitePlayerConnected, setIsWhitePlayerConnected] = useState(false)
  const [isBlackPlayerConnected, setIsBlackPlayerConnected] = useState(false)

  useEffect(() => {
    const isWhitePlayerConnected = authState.connectedUsers.some(
      (userId) => userId === whitePlayer?._id
    )
    setIsWhitePlayerConnected(isWhitePlayerConnected)

    const isBlackPlayerConnected = authState.connectedUsers.some(
      (userId) => userId === blackPlayer?._id
    )
    setIsBlackPlayerConnected(isBlackPlayerConnected)
  }, [
    authState.connectedUsers,
    authState.connectedUsers.length,
    whitePlayer?._id,
    blackPlayer?._id,
    gameState?.players,
    gameState?.players?.black,
    gameState?.players?.white,
  ])

  function timeToPercents(remainigTime: number) {
    const fiveMinutes = 1000 * 60 * 5
    const num = (remainigTime / fiveMinutes) * 100
    return num + '%'
  }

  const getUsers = async () => {
    if (!gameState) return
    if (!gameState?.players) return

    if (gameState?.players.white) {
      const user = await userService.getUser(gameState?.players.white)
      setWhitePlayer(user)
    }
    if (gameState?.players.black) {
      const user = await userService.getUser(gameState?.players.black)
      setBlackPlayer(user)
    }
  }

  function millisToMinutesAndSeconds(millis: number) {
    if (millis < 0) return '00:00'
    var minutes = Math.floor(millis / 60000)
      .toFixed(0)
      .padStart(2, '0')
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameState?.players?.black,
    gameState?.players?.white,
    authState.connectedUsers.length,
  ])

  const screenStyle =
    gameState?.players?.black === authState?.loggedInUser?._id
      ? 'black-screen'
      : 'white-screen'

  const isCurrBlackTurnBg = gameState?.isBlackTurn
    ? ' curr-turn-bg'
    : ' curr-turn-bg'

  return (
    <section className="game-details">
      <div className={'container ' + screenStyle}>
        <div className={'black-player ' + screenStyle}>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.black.map((piece, idx) => (
              <span key={piece}>{piece + idx}</span>
            ))}
          </div>
          <div
            className={`timer ${screenStyle} ${
              gameState?.isBlackTurn ? 'curr-turn-bg ' : ''
            }`}
          >
            {gameState?.remainingTime?.black &&
              millisToMinutesAndSeconds(gameState.remainingTime.black)}
          </div>
          <div
            className="bar"
            style={{
              width:
                gameState?.remainingTime?.black &&
                timeToPercents(gameState.remainingTime.black),
            }}
          ></div>
          <div className="player-name">
            <span
              className={
                isBlackPlayerConnected
                  ? 'is-connected connected'
                  : 'is-connected'
              }
            ></span>
            <p>{blackPlayer?.fullname}</p>
          </div>
        </div>
        <div className="moves"></div>
        <div className="actions"></div>
        <div className={'white-player ' + screenStyle}>
          <div className="player-name">
            <span
              className={
                isWhitePlayerConnected
                  ? 'is-connected connected'
                  : 'is-connected '
              }
            ></span>
            <p>{whitePlayer?.fullname}</p>
          </div>
          <div
            className="bar"
            style={{
              width:
                gameState?.remainingTime?.white &&
                timeToPercents(gameState.remainingTime.white),
            }}
          ></div>
          <div
            className={`timer ${
              !gameState?.isBlackTurn ? 'curr-turn-bg ' : ''
            }`}
          >
            {gameState?.remainingTime?.white &&
              millisToMinutesAndSeconds(gameState.remainingTime.white)}
          </div>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.white.map((piece, idx) => (
              <span key={piece + idx}>{piece}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
