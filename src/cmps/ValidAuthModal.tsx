import { useNavigate } from 'react-router-dom'

interface props {
  onLoginAsGuest: () => Promise<void>
}

export const ValidAuthModal = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  return (
    <div className="valid-auth-modal">
      <div className="bg"></div>
      <div className="container">
        <h1>Please login</h1>
        <button onClick={() => navigate('/sign-in')}>login</button>
        <button onClick={onLoginAsGuest}>login as a guest</button>
      </div>
    </div>
  )
}
