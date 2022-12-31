import { useEffect, useState } from 'react'
import { Route, Link, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { Header } from './cmps/Header'
import { RootState } from './features'
import { setLocalUser } from './features/auth/asyncActions'
import { setConnectedUsers } from './features/auth/authSlice'
import { updateStateChatFromSocket } from './features/chat/chatSlice'

import { updateStateFromSocket } from './features/game/gameSlice'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useTypedSelector'
import { Chat } from './models/Chat'
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

  const onLoginAsGuest = async () => {
    const newUser = await authService.signupAsGuest()
    dispatch(setLocalUser(newUser))
  }
  useEffect(() => {
    const user = authService.getLoggedinUser()
    if (user?._id) socketService.emit('setUserSocket', user._id)
  }, [])

  // handle sockets:
  useEffect(() => {
    if (authState.loggedInUser) {
      socketService.emit('setUserSocket', authState.loggedInUser._id)
    }
    socketService.on('set-connected-users', (connectedUsers: string[]) => {
      dispatch(setConnectedUsers(connectedUsers))
    })
    socketService.on('update-state', (updatedState: GameState) => {
      console.log('update-state')

      dispatch(updateStateFromSocket(updatedState))
    })
    socketService.on('update-chat', (updatedChat: Chat) => {
      dispatch(updateStateChatFromSocket(updatedChat))
    })

    return () => {
      socketService.off('set-connected-users')
      socketService.off('update-state')
    }
  }, [authState.loggedInUser, dispatch])

  return (
    <>
      {/* <nav className="temp-nav">
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
      </nav> */}

      <Header></Header>

      {/* <div style={{ color: 'white' }}>
        {JSON.stringify(authState?.connectedUsers, null, 2)}
      </div> */}
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
