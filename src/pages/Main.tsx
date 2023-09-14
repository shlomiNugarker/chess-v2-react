// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainBoard } from '../cmps/MainBoard'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { GameState } from '../models/GameState'
import { ChatState } from '../models/ChatState'
import { useAuthContext } from '../context/AuthContext'
import { Chat } from '../cmps/Chat'
import { GameDetails } from '../cmps/GameDetails'
import { socketService } from '../services/socketService'
import { isPlayerWin } from '../services/game/service/isPlayerWin'
import { checkIfKingThreatened } from '../services/game/service/checkIfKingThreatened'
import { User } from '../models/User'
import { userService } from '../services/userServise'
import { storageService } from '../services/storageService'
import { gameStateService } from '../services/gameStateService'
import { addPieceInsteadPawn } from '../services/game/service/addPieceInsteadPawn'
import { chatService } from '../services/chatService'
import { SetSelectedCellCoordType } from '../models/SetSelectedCellCoord'
import { cleanBoard } from '../services/game/controller/cleanBoard'
import { isColorPieceWorthCurrPlayerColor } from '../services/game/service/isColorPieceWorthCurrPlayerColor'
import { getPossibleCoords } from '../services/game/service/getPossibleCoords'
import { isNextStepLegal } from '../services/game/service/isNextStepLegal'
import { isPawnStepsEnd } from '../services/game/service/isPawnStepsEnd'
import { movePiece } from '../services/game/service/movePiece'
import { doCastling } from '../services/game/service/doCastling'
import { isValidPlayerTurn } from '../services/game/controller/isValidPlayerTurn'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasGameStarted, setHasGameStarted] = useState(
    true || !!gameState?.isGameStarted
  )

  const handleBoardClick = async (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (!gameState) return
    console.log('cellClicked()')
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
    )
      return

    if (ev.target instanceof Element && gameState) {
      const cellCoord = { i, j }
      const piece = gameState.board[i][j]
      const isSquareSelected = ev.target.classList.contains('selected')
      const isSquareMarked = ev.target.classList.contains('mark')
      const isSquareEatable = ev.target.classList.contains('eatable')
      const isSquareCastling = ev.target.classList.contains('castle')
      const target = ev.target

      if (isSquareEatable && gameState.selectedCellCoord) {
        console.log('handleEatableMove()')
        const { isMoveLegal, state } = isNextStepLegal(gameState, target)

        if (
          (state.isBlackTurn && state.isBlackKingThreatened) ||
          (!state.isBlackTurn && state.isWhiteKingThreatened) ||
          !isMoveLegal
        ) {
          return
        }

        const newState = movePiece(gameState, cellCoord)

        if (!newState) return

        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && (await updateGameState(newState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }
        newState.isBlackTurn = !newState.isBlackTurn
        await updateGameState(newState)
        cleanBoard()
      } else if (isSquareCastling && gameState.selectedCellCoord) {
        console.log('handleCastlingMove()')
        const { isMoveLegal } = isNextStepLegal(gameState, target)
        if (!isMoveLegal) return

        const isCastleLegals = doCastling(gameState, target)
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
      } else if (
        piece &&
        piece !== '' &&
        !isColorPieceWorthCurrPlayerColor(gameState, piece)
      ) {
        return
      } else if (isSquareSelected) {
        // unselect:
        ev.target.classList.remove('selected')
        cleanBoard()
      } else if (isSquareMarked && gameState.selectedCellCoord) {
        console.log('handleStepMove()')
        const { isMoveLegal, state } = isNextStepLegal(gameState, target)
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)

        if (newState && !newState?.isGameStarted && !newState?.isGameStarted)
          newState.isGameStarted = true

        if (!newState) return
        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && (await updateGameState(newState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }
        newState.isBlackTurn = !newState.isBlackTurn
        await updateGameState(newState)

        cleanBoard()
      } else {
        cleanBoard()
        console.log('handlePieceSelection()')
        if (gameState.board[cellCoord.i][cellCoord.j]) {
          target.classList.add('selected')
          setSelectedCellCoord({
            cellCoord,
          })
          const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
          if (possibleCoords) markCells(gameState, possibleCoords)
        }
      }
    }
  }

  function markCells(state: GameState, coords: { i: number; j: number }[]) {
    console.log('markCells()')
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i]
      const elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
      if (!elCell) return

      const piece = state.board[coord.i][coord.j]

      if (isColorPieceWorthCurrPlayerColor(state, piece)) {
        elCell.classList.add('castle')
      }
      //
      else if (state.board[coord.i][coord.j]) {
        elCell.classList.add('eatable')
      }
      //
      else {
        elCell.innerHTML = '<span class="span"></span>'
        elCell.classList.add('mark')
      }
    }
  }

  function copyToClipBoard(
    id: string,
    baseUrl: string = 'https://chess-v2-backend-production.up.railway.app/#/'
  ) {
    console.log('copyToClipBoard')
    navigator.clipboard.writeText(`${baseUrl}${id}`)
  }

  const getChatById = async (chatId: string) => {
    console.log('getChatById()')
    const chat = await chatService.getById(chatId)
    setChatState(chat)
    return chat
  }

  const updateGameState = async (newState: GameState) => {
    console.log('updateGameState()')
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

  const setSelectedCellCoord: SetSelectedCellCoordType = ({ cellCoord }) => {
    console.log('setSelectedCellCoord()')
    if (!gameState) return
    const game = { ...gameState }
    game.selectedCellCoord = cellCoord
    setGameState(game)
    // updateGameState(game as GameState, setGameState)
  }

  const saveChat = async (chatToUpdate: ChatState) => {
    console.log('saveChat()')

    const savedChat = await chatService.save(chatToUpdate)
    if (savedChat?._id && savedChat?.userId && savedChat?.userId2)
      socketService.emit('chat-updated', savedChat)
    setChatState(savedChat)
    return savedChat
  }

  const onShareGameUrl = async (loggedInUser: User, id: string) => {
    const shareData = {
      title: 'Chess game',
      text: `${loggedInUser?.fullname} invited you to play chess !`,
      url: `https://chess-v2-backend-production.up.railway.app/#/${id}`,
    }
    try {
      console.log('onShareGameUrl()')

      await navigator.share(shareData)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChoosePieceToAdd = async ({ piece }: any) => {
    console.log('onChoosePieceToAdd()')
    if (!cellCoordsToAddInsteadPawn || !gameState) return
    const { newState } = addPieceInsteadPawn(
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
    console.log('joinPlayerToTheGame()')

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
  }, [authContextData?.loggedInUser?._id, chatState, gameState])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (id) {
        console.log('getState')
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
    if (hasGameStarted && gameState && !isWin && isPlayerWin(gameState)) {
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
    gameState?.isOnline,
    chatState?._id,
    chatState?.userId,
    chatState?.userId2,
    authContextData?.loggedInUser?._id,
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
  }, [
    authContextData,
    authContextData?.loggedInUser,
    authContextData?.setConnectedUsers,
  ])

  // Handle case if both kings are threatened one after one
  useEffect(() => {
    if (gameState && hasGameStarted) {
      checkIfKingThreatened(gameState)

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

  // Handle time:
  useEffect(() => {}, [gameState, gameState?.isGameStarted])

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
        <MainBoard
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
          setChatState={setChatState}
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
