import { Route, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { Header } from './cmps/Header'
import { useAuthContext } from './context/AuthContext'
import { Home } from './pages/Home'

import { Main } from './pages/Main'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { Puzzles } from './pages/Puzzles'
import { About } from './pages/About'

export const App = () => {
  const { LoginAsGuest } = useAuthContext()

  return (
    <>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/puzzles" element={<Puzzles />} />
        <Route path="/:id" element={<Main onLoginAsGuest={LoginAsGuest} />} />
        <Route path="/" element={<Home onLoginAsGuest={LoginAsGuest} />} />
      </Routes>
    </>
  )
}
