import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'

import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'
import { gameStateService } from '../services/gameStateService'
import { setNewState } from '../features/game/asyncActions'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { authService } from '../services/authService'
import { setLocalUser } from '../features/auth/authSlice'

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
    dispatch(setNewState(newGame)).then((res) => {
      const gameId = res.payload._id
      navigate(`/${gameId}`)
    })
  }

  const onStartNewGameOffline = () => {
    // const userId = authState.loggedInUser?._id
    // if (!userId) {
    //   alert('please login')
    //   return
    // }
    // const newGame = gameStateService.getNewGame(userId)
    // console.log({ newGame })
    // dispatch(setNewState(newGame)).then((res) => {
    //   const gameId = res.payload._id
    //   navigate(`/${gameId}`)
    // })
  }

  const onLoginAsGuest = () => {
    console.log('onLoginAsGuest')
    const newUser = authService.signupAsGuest()
    dispatch(setLocalUser(newUser))
  }

  return (
    <div className="home-page">
      <div className="container">
        <button onClick={onStartNewGameOnline}>
          Play with a friend online
        </button>
        <button>Play with the computer </button>
        <button>Play with a friend offline </button>
      </div>
      {!authState.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
