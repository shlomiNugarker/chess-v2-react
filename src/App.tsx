import { Route, Link, useNavigate, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { Header } from './cmps/Header'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Main } from './pages/Main'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

const App = () => {
  // const navigate = useNavigate()
  return (
    <>
      <nav className="temp-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-in">sign-in</Link>
          </li>
          <li>
            <Link to="/sign-up">sign-up</Link>
          </li>
          <li>
            <Link to="/main">Main</Link>
          </li>
        </ul>
      </nav>
      <Header></Header>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
