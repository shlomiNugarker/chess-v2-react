import { useEffect, useState } from 'react'
import { Route, Link, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { Header } from './cmps/Header'
import { RootState } from './features'
import { setLocalUser } from './features/auth/asyncActions'
import { setConnectedUsers } from './features/auth/authSlice'

import { updateStateFromSocket } from './features/game/gameSlice'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useTypedSelector'
import { GameState } from './models/GameState'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { authService } from './services/authService'
import { socketService } from './services/socketService'

const App = () => {
  const authState = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  // handle sockets:
  const onLoginAsGuest = async () => {
    const newUser = await authService.signupAsGuest()
    dispatch(setLocalUser(newUser))
  }

  useEffect(() => {
    if (authState.loggedInUser) {
      socketService.emit('setUserSocket', authState.loggedInUser._id)
    }
    socketService.on('add-connected-users', (connectedUsers: any[]) => {
      console.log(connectedUsers)
      dispatch(setConnectedUsers(connectedUsers))
    })
    socketService.on('update-state', (updatedState: GameState) => {
      dispatch(updateStateFromSocket(updatedState))
    })

    return () => {
      socketService.off('add-connected-users')
      socketService.off('update-state')
    }
  }, [authState.loggedInUser, dispatch])

  return (
    <>
      <nav className="temp-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/sign-in">sign-in</Link>
          </li>
          <li>
            <Link to="/sign-up">sign-up</Link>
          </li>
        </ul>
      </nav>

      <Header></Header>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:id" element={<Main onLoginAsGuest={onLoginAsGuest} />} />
        <Route path="/" element={<Home onLoginAsGuest={onLoginAsGuest} />} />
      </Routes>
    </>
  )
}

export default App
