// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { GameState } from '../models/GameState'
import { ChatState } from '../models/ChatState'
import { useAuthContext } from '../context/AuthContext'
import { chatService } from '../services/chatService'

import { Chat } from '../cmps/Chat'
import { GameDetails } from '../cmps/GameDetails'
import { socketService } from '../services/socketService'
import { isPlayerWin } from '../services/game/service/isPlayerWin'
import { checkIfKingThreatened } from '../services/game/service/checkIfKingThreatened'
import { onShareGameUrl } from '../services/game/controller/onShareGameUrl'
import { copyToClipBoard } from '../services/game/controller/copyToClipBoard'
import { onChoosePieceToAdd } from '../services/game/controller/onChoosePieceToAdd'
import { updateGameState } from '../services/game/controller/updateGameState'
import { joinPlayerToTheGame } from '../services/game/controller/joinPlayerToTheGame'
import { getState } from '../services/game/controller/getState'
import { User } from '../models/User'
import { userService } from '../services/userServise'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}
export const Main = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [gameState, setGameState] = useState<GameState | null>(null)
  const [chatState, setChatState] = useState<ChatState | null>(null)
  const authContextData = useAuthContext()
  const [isTwoPlayerInTheGame, setIsTwoPlayerInTheGame] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isPromotionChoice, setIsPromotionChoice] = useState(false)
  const [hasGameStarted, setHasGameStarted] = useState(
    true || !!gameState?.isGameStarted
  )
  const [cellCoordsToAddInsteadPawn, setCellCoordsToAddInsteadPawn] = useState<{
    i: number
    j: number
  } | null>(null)

  const [whitePlayer, setWhitePlayer] = useState<User | null>(null)
  const [blackPlayer, setBlackPlayer] = useState<User | null>(null)
  const [isWhitePlayerConnected, setIsWhitePlayerConnected] = useState(false)
  const [isBlackPlayerConnected, setIsBlackPlayerConnected] = useState(false)

  useEffect(() => {
    console.log(setHasGameStarted)

    if (id) getState(id, setGameState)
  }, [id])

  const saveChat = async (chat: ChatState) => {
    const savedChat = await chatService.save(chat)
    if (chat._id && chat.userId && chat.userId2)
      socketService.emit('chat-updated', savedChat)
    setChatState(savedChat)
    return savedChat
  }

  const getChatById = async (chatId: string) => {
    const chat = await chatService.getById(chatId)
    setChatState(chat)
    return chat
  }

  const setSelectedCellCoord = (cellCoord: GameState['selectedCellCoord']) => {
    if (!gameState) return
    const game = { ...gameState }
    game.selectedCellCoord = cellCoord
    updateGameState(game as GameState, setGameState)
  }

  const moveInStateHistory = (num: 1 | -1) => {
    console.log(num)
  }

  useEffect(() => {
    if (hasGameStarted && gameState && !isWin && isPlayerWin(gameState)) {
      setIsWin(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.isBlackTurn, isWin])

  useEffect(() => {
    if (!gameState?.players?.black || !gameState?.players?.white) {
      const stateToUpdate = joinPlayerToTheGame({
        gameState,
        chatState,
        loggedInUser: authContextData?.loggedInUser,
        updateGameState,
        setGameState,
        saveChat,
      })
      if (stateToUpdate) updateGameState(stateToUpdate, setGameState)
    }
    if (gameState?.players?.black && gameState?.players?.white) {
      setIsTwoPlayerInTheGame(true)
    }
  }, [
    gameState,
    gameState?.players?.black,
    gameState?.players?.white,
    authContextData?.loggedInUser,
    gameState?.isOnline,
    chatState?._id,
    chatState?.userId,
    chatState?.userId2,
    authContextData?.loggedInUser?._id,
    isTwoPlayerInTheGame,
    chatState,
  ])

  // handle sockets:
  useEffect(() => {
    if (authContextData?.loggedInUser) {
      socketService.emit('setUserSocket', authContextData?.loggedInUser._id)
    }
    socketService.on('set-connected-users', (connectedUsers: string[]) => {
      if (authContextData?.setConnectedUsers)
        authContextData?.setConnectedUsers(connectedUsers)
    })
    socketService.on('update-state', (updatedState: GameState) => {
      setGameState(updatedState)
    })
    socketService.on('update-chat', (updatedChat: ChatState) => {
      setChatState(updatedChat)
    })

    return () => {
      socketService.off('set-connected-users')
      socketService.off('update-state')
    }
  }, [
    authContextData,
    authContextData?.loggedInUser,
    authContextData?.setConnectedUsers,
  ])

  useEffect(() => {
    if (gameState && hasGameStarted) {
      checkIfKingThreatened(gameState)

      // handle case if both kings threatened one after one
      const lastKingThreatened = gameState.isBlackTurn
        ? gameState.kingPos.white
        : gameState.kingPos.black

      if (lastKingThreatened) {
        const kingEl = document.querySelector(
          `#cell-${lastKingThreatened.i}-${lastKingThreatened.j}`
        )

        if (kingEl && kingEl.classList.contains('red'))
          kingEl.classList.remove('red')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.isBlackTurn])

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
  }, [blackPlayer, gameState, setBlackPlayer, setWhitePlayer, whitePlayer])

  useEffect(() => {
    const isWhitePlayerConnected = authContextData?.connectedUsers?.some(
      (userId) => userId === whitePlayer?._id
    )
    setIsWhitePlayerConnected(!!isWhitePlayerConnected)

    const isBlackPlayerConnected = authContextData?.connectedUsers?.some(
      (userId) => userId === blackPlayer?._id
    )
    setIsBlackPlayerConnected(!!isBlackPlayerConnected)
  }, [
    authContextData?.connectedUsers,
    blackPlayer?._id,
    setIsBlackPlayerConnected,
    setIsWhitePlayerConnected,
    whitePlayer?._id,
  ])

  // useEffect(() => {
  //   // handle time:
  //   const intervalId = setInterval(() => {
  //     if (gameState && gameState.isBlackTurn && gameState.isGameStarted) {
  //       dispatch(
  //         updateTime({
  //           white: gameState?.remainingTime.white,
  //           black: gameState?.remainingTime.black - 1000,
  //         })
  //       )
  //     }
  //     if (gameState && !gameState.isBlackTurn && gameState.isGameStarted) {
  //       dispatch(
  //         updateTime({
  //           white: gameState?.remainingTime.white - 1000,
  //           black: gameState?.remainingTime.black,
  //         })
  //       )
  //     }
  //   }, 1000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [gameState, gameState?.isGameStarted])

  // console.log('rebder Main.tsx')
  return (
    <div className="main-page">
      {gameState?.isOnline && !isTwoPlayerInTheGame && (
        <div className="wait-container">
          <p className="is-waiting">Waiting for a player...</p>
          <p className="is-waiting" onClick={() => !!id && copyToClipBoard(id)}>
            Share this link for play <span>click to copy </span>
          </p>
          <button
            className="share- btn "
            onClick={() =>
              !!authContextData?.loggedInUser &&
              !!id &&
              onShareGameUrl(authContextData?.loggedInUser, id)
            }
          >
            Share
          </button>
        </div>
      )}

      {gameState && (
        <Board
          isTwoPlayerInTheGame={isTwoPlayerInTheGame}
          gameState={gameState}
          loggedInUser={authContextData?.loggedInUser || null}
          updateGameState={updateGameState}
          setSelectedCellCoord={setSelectedCellCoord}
          setGameState={setGameState}
          setChatState={setChatState}
          isWin={isWin}
          isPromotionChoice={isPromotionChoice}
          setIsPromotionChoice={setIsPromotionChoice}
          setCellCoordsToAddInsteadPawn={setCellCoordsToAddInsteadPawn}
          onChoosePieceToAdd={onChoosePieceToAdd}
          cellCoordsToAddInsteadPawn={cellCoordsToAddInsteadPawn}
        />
      )}

      {gameState && (
        <GameDetails
          gameState={gameState}
          loggedInUser={authContextData?.loggedInUser || null}
          moveInStateHistory={moveInStateHistory}
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          isWhitePlayerConnected={isWhitePlayerConnected}
          isBlackPlayerConnected={isBlackPlayerConnected}
        />
      )}

      {gameState && (
        <Chat
          loggedInUser={authContextData?.loggedInUser || null}
          chatState={chatState}
          saveChat={saveChat}
          getChatById={getChatById}
          gameState={gameState}
        />
      )}

      {!gameState && (
        <div className="msg">
          <p>Did not found a game..</p>
          <button onClick={() => navigate('/')}>Go home</button>
        </div>
      )}

      {!authContextData?.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
