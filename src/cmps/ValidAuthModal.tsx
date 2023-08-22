import { useNavigate } from 'react-router-dom'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}

export const ValidAuthModal = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()

  console.log('render ValidAuthModal.tsx')
  return (
    <div className="valid-auth-modal">
      <div className="bg"></div>
      <div className="container">
        <h1>Please login</h1>
        <button onClick={() => navigate('/sign-in')}>login</button>
        <button onClick={() => onLoginAsGuest && onLoginAsGuest()}>
          login as a guest
        </button>
      </div>
    </div>
  )
}
