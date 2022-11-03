import { Route, Link, useNavigate, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Main } from './pages/Main'

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
            <Link to="/main">Main</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
