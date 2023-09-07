import * as _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { GameState } from '../models/GameState'
import { ChatState } from '../models/ChatState'
import { useAuthContext } from '../context/AuthContext'
import { chatService } from '../services/chatService'
import { storageService } from '../services/storageService'
import { gameStateService } from '../services/gameStateService'
import { User } from '../models/User'
import { Chat } from '../cmps/Chat'
import { GameDetails } from '../cmps/GameDetails'
import { socketService } from '../services/socketService'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}
export const Main = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()

  const [gameState, setGameState] = useState<GameState | null>(null)
  const [chatState, setChatState] = useState<ChatState | null>(null)
  const authContextData = useAuthContext()
  const [isTwoPlayerInTheGame, setIsTwoPlayerInTheGame] = useState(false)

  const { id } = useParams()

  const getState = useCallback(
    async (gameId: string) => {
      if (id && id.length > 10) {
        const state = await gameStateService.getById(gameId)
        setGameState(state)
        return state
      }

      if (id && id.length < 10) {
        const stateFromStorage = storageService.get('chess-game', gameId)
        if (stateFromStorage) setGameState(stateFromStorage)
      }
    },
    [id]
  )

  useEffect(() => {
    if (id) getState(id)
  }, [getState, id])

  const saveChat = async (chat: ChatState) => {
    const savedChat = await chatService.save(chat)
    if (chat._id && chat.userId && chat.userId2)
      socketService.emit('chat-updated', savedChat)
    setChatState(savedChat)
    return savedChat
  }

  const updateGameState = async (newState: GameState) => {
    const copiedState = _.cloneDeep(newState)
    copiedState.stateHistory.push(newState)

    if (!copiedState.isOnline) {
      storageService.put('chess-game', copiedState)

      setGameState(copiedState)
    } else {
      const savedState = await gameStateService.saveState(copiedState)
      socketService.emit('state-updated', savedState)
      setGameState((prev) => ({
        ...prev,
        ...savedState,
      }))
    }
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
    setGameState(game as GameState)
  }

  const joinPlayerToTheGame = useCallback(() => {
    if (gameState?.players?.white && gameState?.players?.black === '') {
      const stateToUpdate = _.cloneDeep(gameState)
      const chatToUpdate = _.cloneDeep(chatState)

      if (stateToUpdate.players) {
        const userId = authContextData?.loggedInUser?._id
        if (gameState.players.white === userId) return
        if (!userId) return

        if (gameState.chatId && chatToUpdate && userId) {
          if (!chatToUpdate.userId2) chatToUpdate.userId2 = userId
          else if (!chatToUpdate.userId) chatToUpdate.userId = userId

          saveChat(chatToUpdate)
        }
        stateToUpdate.players.black = userId
      }
      updateGameState(stateToUpdate)
      return stateToUpdate
    } else if (gameState?.players?.black && gameState?.players?.white === '') {
      const stateToUpdate = _.cloneDeep(gameState)
      if (stateToUpdate.players) {
        const userId = authContextData?.loggedInUser?._id

        if (gameState.players.black === userId) return
        if (!userId) return

        stateToUpdate.players.white = userId
      }
      updateGameState(stateToUpdate)
      return stateToUpdate
    }
  }, [chatState, gameState, authContextData?.loggedInUser?._id])

  useEffect(() => {
    if (!gameState?.players?.black || !gameState?.players?.white) {
      const stateToUpdate = joinPlayerToTheGame()
      if (stateToUpdate) updateGameState(stateToUpdate)
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
    joinPlayerToTheGame,
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
        />
      )}

      {gameState && (
        <GameDetails
          gameState={gameState}
          connectedUsers={authContextData?.connectedUsers || null}
          loggedInUser={authContextData?.loggedInUser || null}
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

const onShareGameUrl = async (loggedInUser: User, id: string) => {
  const shareData = {
    title: 'Chess game',
    text: `${loggedInUser?.fullname} invited you to play chess !`,
    url: `https://chess-v2-backend-production.up.railway.app/#/${id}`,
  }
  try {
    await navigator.share(shareData)
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}

function copyToClipBoard(
  id: string,
  baseUrl: string = 'https://chess-v2-backend-production.up.railway.app/#/'
) {
  navigator.clipboard.writeText(`${baseUrl}${id}`)
}
