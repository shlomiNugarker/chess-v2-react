import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'

import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'
import { gameStateService } from '../services/gameStateService'
import { setNewState } from '../features/game/asyncActions'

export const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authState = useAppSelector((state: RootState) => state.auth)

  const onStartNewGameOnline = () => {
    const userId = authState.loggedInUser?._id
    if (!userId) {
      alert('please login')
      return
    }
    const newGame = gameStateService.getNewGame(userId)
    console.log({ newGame })
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
      </div>
    </div>
  )
}
