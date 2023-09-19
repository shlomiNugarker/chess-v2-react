import { useNavigate } from 'react-router-dom'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { useAuthContext } from '../context/AuthContext'
import { gameStateService } from '../services/gameStateService'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}
export const Home = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  const authContextData = useAuthContext()

  const onStartNewGame = async (
    isOnline: boolean,
    isPlayWithComputer: boolean = false
  ) => {
    const userId = authContextData?.loggedInUser?._id || 'Guest'
    const newGame = gameStateService.getNewGame(
      userId,
      isOnline,
      isPlayWithComputer
    )
    const stateId = await gameStateService.setNewState(newGame)
    if (stateId) navigate(`/${stateId}`)
  }
  // console.log('render Home()')
  return (
    <div className="home-page">
      <div className="container">
        <button className="blue-btn" onClick={() => onStartNewGame(true)}>
          Play with a friend online
        </button>
        <button className="blue-btn" onClick={() => onStartNewGame(false)}>
          Play with a friend offline
        </button>
        <button
          className="blue-btn"
          onClick={() => onStartNewGame(false, true)}
        >
          Play with the computer
        </button>
      </div>
      {!authContextData?.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
