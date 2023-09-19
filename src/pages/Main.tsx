import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

// SERVICES:
import { socketService } from '../services/socketService'
import { userService } from '../services/userServise'
import { storageService } from '../services/storageService'
import { gameStateService } from '../services/gameStateService'
import { chatService } from '../services/chatService'
import { chess } from '../services/game/service'

// CONTROLLER:
import { cleanBoard } from '../services/game/controller/cleanBoard'
import { copyToClipBoard } from '../services/game/controller/copyToClipBoard'
import { setSelectedCellCoord } from '../services/game/controller/setSelectedCellCoord'
import { onShareGameUrl } from '../services/game/controller/onShareGameUrl'
import { isValidPlayerTurn } from '../services/game/controller/isValidPlayerTurn'
import { markCells } from '../services/game/controller/markCells'

// CMPS:
import { MainGame } from '../cmps/MainGame'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { Chat } from '../cmps/Chat'
import { GameDetails } from '../cmps/GameDetails'

// MODELS:
import { GameState } from '../models/GameState'
import { ChatState } from '../models/ChatState'
import { User } from '../models/User'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}
export const Main = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const authContextData = useAuthContext()

  const [gameState, setGameState] = useState<GameState | null>(null)
  const [chatState, setChatState] = useState<ChatState | null>(null)
  const [isTwoPlayerInTheGame, setIsTwoPlayerInTheGame] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isPromotionChoice, setIsPromotionChoice] = useState(false)
  const [whitePlayer, setWhitePlayer] = useState<User | null>(null)
  const [blackPlayer, setBlackPlayer] = useState<User | null>(null)
  const [isWhitePlayerConnected, setIsWhitePlayerConnected] = useState(false)
  const [isBlackPlayerConnected, setIsBlackPlayerConnected] = useState(false)
  const [cellCoordsToAddInsteadPawn, setCellCoordsToAddInsteadPawn] = useState<{
    i: number
    j: number
  } | null>(null)

  const [hasGameStarted, setHasGameStarted] = useState(
    !!gameState?.isGameStarted
  )

  const handleBoardClick = async (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (!gameState) return
    // console.log('handleBoardClick()')
    if (
      gameState &&
      !isValidPlayerTurn({
        isOnlineGame: gameState.isOnline,
        isBlackTurn: gameState.isBlackTurn,
        isTwoPlayerInTheGame,
        loggedInUser: authContextData?.loggedInUser,
        blackPlayerID: gameState.players?.black,
        whitePlayerID: gameState.players?.white,
      })
    ) {
      return
    }

    if (ev.target instanceof Element && gameState) {
      const cellCoord = { i, j }
      const piece = gameState.board[i][j]
      const isSquareSelected = ev.target.classList.contains('selected')
      const isSquareMarked = ev.target.classList.contains('mark')
      const isSquareEatable = ev.target.classList.contains('eatable')
      const isSquareCastling = ev.target.classList.contains('castle')
      const target = ev.target

      // HANDLE EATABLE MOVE:
      if (isSquareEatable && gameState.selectedCellCoord) {
        // console.log('handleEatableMove()')
        const toCoord = chess.getCellCoord(target.id)
        const { isMoveLegal, state } = chess.isNextStepLegal(gameState, toCoord)
        const isPlayerThreatened =
          (state.isBlackTurn && state.isBlackKingThreatened) ||
          (!state.isBlackTurn && state.isWhiteKingThreatened)

        if (isPlayerThreatened || !isMoveLegal) return

        const newState = chess.movePiece(gameState, cellCoord)

        if (chess.isPawnStepsEnd(newState, cellCoord)) {
          setIsPromotionChoice(true)
          await updateGameState(newState)
          setCellCoordsToAddInsteadPawn(cellCoord)
        } else {
          newState.isBlackTurn = !newState.isBlackTurn
          await updateGameState(newState)
          cleanBoard()
        }
      }
      // HANDLE CASTLING MOVE:
      else if (isSquareCastling && gameState.selectedCellCoord) {
        // console.log('handleCastlingMove()')
        const toCoord = chess.getCellCoord(target.id)
        const { isMoveLegal } = chess.isNextStepLegal(gameState, toCoord)
        if (!isMoveLegal) return
        const isCastleLegals = chess.doCastling(gameState, target)
        if (isCastleLegals?.newState) {
          isCastleLegals.newState.isBlackTurn =
            !isCastleLegals.newState.isBlackTurn
        }
        if (
          isCastleLegals &&
          isCastleLegals.newState &&
          isCastleLegals.isCastleLegal
        ) {
          await updateGameState(isCastleLegals.newState)
        }
        if (isCastleLegals && !isCastleLegals.isCastleLegal) return
        cleanBoard()
      }
      // HANDLE PIECE COLOR:
      else if (
        piece &&
        piece !== chess.gPieces.EMPTY &&
        !chess.isColorPieceWorthCurrPlayerColor(gameState, piece)
      ) {
        return
      }
      // UNSELECT:
      else if (isSquareSelected) {
        ev.target.classList.remove('selected')
        cleanBoard()
      }
      // HANDLE STEP MOVE:
      else if (isSquareMarked && gameState.selectedCellCoord) {
        // console.log('handleStepMove()')
        const toCoord = chess.getCellCoord(target.id)
        const { isMoveLegal, state } = chess.isNextStepLegal(gameState, toCoord)
        if (!isMoveLegal) return
        const newState = chess.movePiece(gameState, cellCoord)
        if (newState && !newState.isGameStarted) {
          newState.isGameStarted = true
          setHasGameStarted(true)
        }
        if (chess.isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && (await updateGameState(newState))
          setCellCoordsToAddInsteadPawn(cellCoord)
        } else {
          newState.isBlackTurn = !newState.isBlackTurn
          await updateGameState(newState)
          cleanBoard()
        }
      }
      // HANDLE PIECE SELECTION:
      else {
        cleanBoard()
        // console.log('handlePieceSelection()')
        if (gameState.board[cellCoord.i][cellCoord.j]) {
          target.classList.add('selected')
          const newState = setSelectedCellCoord(cellCoord, gameState)
          setGameState(newState)
          const possibleCoords = chess.getPossibleCoords(
            gameState,
            piece,
            cellCoord
          )
          if (possibleCoords) markCells(gameState, possibleCoords)
        }
      }
    }
  }

  const getChatById = async (chatId: string) => {
    // console.log('getChatById()')
    const chat = await chatService.getById(chatId)
    setChatState(chat)
    return chat
  }

  const updateGameState = async (newState: GameState) => {
    // console.log('updateGameState()')
    if (!newState.isOnline) {
      storageService.put('chess-game', newState)
      setGameState(newState)
    } else {
      const savedState = await gameStateService.saveState(newState)
      socketService.emit('state-updated', savedState)
      setGameState((prev) => ({
        ...prev,
        ...savedState,
      }))
    }
  }

  const saveChat = async (chatToUpdate: ChatState) => {
    // console.log('saveChat()')
    const savedChat = await chatService.save(chatToUpdate)
    if (savedChat?._id && savedChat?.userId && savedChat?.userId2)
      socketService.emit('chat-updated', savedChat)
    setChatState(savedChat)
    return savedChat
  }

  const onChoosePieceToAdd = async ({ piece }: { piece: string }) => {
    // console.log('onChoosePieceToAdd()')
    if (!cellCoordsToAddInsteadPawn || !gameState) return
    const { newState } = chess.addPieceInsteadPawn(
      gameState,
      cellCoordsToAddInsteadPawn,
      piece
    )
    newState.isBlackTurn = !newState.isBlackTurn
    await updateGameState(newState)
    cleanBoard()
    setIsPromotionChoice(false)
  }

  const joinPlayerToTheGame = useCallback(() => {
    // console.log('joinPlayerToTheGame()')
    if (gameState?.players?.white && gameState?.players?.black === '') {
      const stateToUpdate = chess.cloneDeep(gameState)
      const chatToUpdate = chess.cloneDeep(chatState)

      if (stateToUpdate.players) {
        const userId = authContextData?.loggedInUser?._id
        if (gameState.players.white === userId) return
        if (!userId) return

        if (gameState.chatId && chatToUpdate && userId) {
          if (!chatToUpdate.userId2) chatToUpdate.userId2 = userId
          else if (!chatToUpdate.userId) {
            chatToUpdate.userId = userId
          }
          chatToUpdate && saveChat(chatToUpdate)
        }
        stateToUpdate.players.black = userId
      }
      updateGameState(stateToUpdate)
      return stateToUpdate
    } else if (gameState?.players?.black && gameState?.players?.white === '') {
      const stateToUpdate = chess.cloneDeep(gameState)
      if (stateToUpdate.players) {
        const userId = authContextData?.loggedInUser?._id

        if (gameState.players.black === userId) return
        if (!userId) return

        stateToUpdate.players.white = userId
      }
      updateGameState(stateToUpdate)
      return stateToUpdate
    }
  }, [authContextData?.loggedInUser?._id, chatState, gameState])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (id) {
        // console.log('getState')
        const gameId = id
        if (gameId && gameId.length > 10) {
          const state = await gameStateService.getById(gameId)
          setGameState(state)
          return state
        }

        if (gameId && gameId.length < 10) {
          const stateFromStorage = storageService.get('chess-game', gameId)
          if (stateFromStorage) {
            setGameState(stateFromStorage)
          }
        }
      }
    })()
  }, [id])

  const moveInStateHistory = (num: 1 | -1) => {
    console.log(num)
  }

  // Check if player win:
  useEffect(() => {
    if (hasGameStarted && gameState && !isWin && chess.isPlayerWin(gameState)) {
      setIsWin(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.isBlackTurn, isWin])

  // Handle cases when user enter the game:
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
    authContextData?.loggedInUser?._id,
    gameState?.isOnline,
    chatState?._id,
    chatState?.userId,
    chatState?.userId2,
    isTwoPlayerInTheGame,
    chatState,
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
      socketService.off('update-chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContextData?.loggedInUser, authContextData?.setConnectedUsers])

  // Handle case if both kings are threatened one after one
  useEffect(() => {
    if (gameState && hasGameStarted) {
      chess.checkIfKingThreatened(gameState)

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

  // Get users:
  useEffect(() => {
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

  // Handle connected players:
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

  //  // Handle time:
  // useEffect(() => {}, [gameState, gameState?.isGameStarted])

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
              onShareGameUrl(authContextData.loggedInUser, id)
            }
          >
            Share
          </button>
        </div>
      )}

      <MainGame
        isTwoPlayerInTheGame={isTwoPlayerInTheGame}
        gameState={gameState}
        loggedInUser={authContextData?.loggedInUser || null}
        updateGameState={updateGameState}
        setGameState={setGameState}
        setChatState={setChatState}
        isWin={isWin}
        isPromotionChoice={isPromotionChoice}
        setIsPromotionChoice={setIsPromotionChoice}
        onChoosePieceToAdd={onChoosePieceToAdd}
        cellCoordsToAddInsteadPawn={cellCoordsToAddInsteadPawn}
        handleBoardClick={handleBoardClick}
      />

      <GameDetails
        gameState={gameState}
        loggedInUser={authContextData?.loggedInUser || null}
        moveInStateHistory={moveInStateHistory}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        isWhitePlayerConnected={isWhitePlayerConnected}
        isBlackPlayerConnected={isBlackPlayerConnected}
      />

      <Chat
        loggedInUser={authContextData?.loggedInUser || null}
        chatState={chatState}
        saveChat={saveChat}
        getChatById={getChatById}
        gameState={gameState}
        setChatState={setChatState}
      />

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
