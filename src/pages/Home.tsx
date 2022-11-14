import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'

import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'
import { gameStateService } from '../services/gameStateService'
import { setNewState } from '../features/game/asyncActions'
import { ValidAuthModal } from '../cmps/ValidAuthModal'

interface props {
  onLoginAsGuest: any
}
export const Home = ({ onLoginAsGuest }: props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authState = useAppSelector((state: RootState) => state.auth)

  const onStartNewGameOnline = () => {
    const userId = authState.loggedInUser?._id
    if (!userId) {
      alert('please login')
      return
    }
    const newGame = gameStateService.getNewGame(userId, true)
    dispatch(setNewState(newGame)).then((res) => {
      const gameId = res.payload._id
      navigate(`/${gameId}`)
    })
  }

  const onStartNewGameOffline = () => {
    const userId = authState.loggedInUser?._id || 'Guest'
    const newGame = gameStateService.getNewGame(userId, false)
    dispatch(setNewState(newGame)).then((res) => {
      const gameId = res.payload._id
      navigate(`/${gameId}`)
    })
  }

  return (
    <div className="home-page">
      <div className="container">
        <button onClick={onStartNewGameOnline}>
          Play with a friend online
        </button>
        <button>Play with the computer </button>
        <button onClick={onStartNewGameOffline}>
          Play with a friend offline
        </button>
      </div>
      {!authState.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
