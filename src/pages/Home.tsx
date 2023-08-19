import { useNavigate } from 'react-router-dom'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { useAuthContext } from '../context/AuthContext'
import { gameStateService } from '../services/gameStateService'

interface props {
  onLoginAsGuest: () => Promise<void>
}
export const Home = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  const { loggedInUser } = useAuthContext()

  const onStartNewGame = async (isOnline: boolean) => {
    const userId = loggedInUser?._id || 'Guest'
    const newGame = gameStateService.getNewGame(userId, isOnline)
    const stateId = await gameStateService.setNewState(newGame)

    if (stateId) navigate(`/${stateId}`)
  }

  return (
    <div className="home-page">
      <div className="container">
        <button className="blue-btn" onClick={() => onStartNewGame(true)}>
          Play with a friend online
        </button>
        <button className="blue-btn" onClick={() => onStartNewGame(false)}>
          Play with a friend offline
        </button>
      </div>
      {!loggedInUser && <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />}
    </div>
  )
}
