import { useEffect, useState } from 'react'
import { User } from '../models/User'
import { userService } from '../services/userServise'
import { GameState } from '../models/GameState'

interface Props {
  gameState: GameState
  connectedUsers: string[] | null
  loggedInUser: User | null
}

export const GameDetails = ({
  gameState,
  connectedUsers,
  loggedInUser,
}: Props) => {
  const [whitePlayer, setWhitePlayer] = useState<User | null>(null)
  const [blackPlayer, setBlackPlayer] = useState<User | null>(null)

  const [isWhitePlayerConnected, setIsWhitePlayerConnected] = useState(false)
  const [isBlackPlayerConnected, setIsBlackPlayerConnected] = useState(false)

  useEffect(() => {
    const isWhitePlayerConnected = connectedUsers?.some(
      (userId) => userId === whitePlayer?._id
    )
    setIsWhitePlayerConnected(!!isWhitePlayerConnected)

    const isBlackPlayerConnected = connectedUsers?.some(
      (userId) => userId === blackPlayer?._id
    )
    setIsBlackPlayerConnected(!!isBlackPlayerConnected)
  }, [blackPlayer?._id, connectedUsers, whitePlayer?._id])

  function timeToPercents(remainigTime: number) {
    const fiveMinutes = 1000 * 60 * 5
    const num = (remainigTime / fiveMinutes) * 100
    return num + '%'
  }

  function millisToMinutesAndSeconds(millis: number) {
    if (millis < 0) return '00:00'
    const minutes = Math.floor(millis / 60000)
      .toFixed(0)
      .padStart(2, '0')
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds
  }

  useEffect(() => {
    // get users:
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (!gameState) return
      if (!gameState?.players) return

      if (gameState?.players.white && !whitePlayer) {
        const user = await userService.getUser(gameState?.players.white)
        setWhitePlayer(user)
      }
      if (gameState?.players.black && !blackPlayer) {
        const user = await userService.getUser(gameState?.players.black)
        setBlackPlayer(user)
      }
    })()
  }, [blackPlayer, gameState, whitePlayer])

  const screenStyle =
    gameState?.players?.black === loggedInUser?._id
      ? 'black-screen'
      : 'white-screen'

  return (
    <section className="game-details">
      <div className={'container ' + screenStyle}>
        <div className={'black-player ' + screenStyle}>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.black.map((piece, idx) => (
              <span key={piece + idx}>{piece}</span>
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
