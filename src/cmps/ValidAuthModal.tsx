import { useNavigate } from 'react-router-dom'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}

export const ValidAuthModal = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  // console.log('render ValidAuthModal.tsx')
  return (
    <div className="z-50">
      <div className="bg-black bg-opacity-45 fixed inset-0"></div>
      <div className="bg-[#48463f] flex flex-col items-center justify-center rounded fixed p-5 w-[30vw] min-h-[10vh] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-[10px]">Please login</h1>
        <button className="blue-btn my-[5px]" onClick={() => navigate('/sign-in')}>login</button>
        <button className="blue-btn my-[5px]" onClick={() => onLoginAsGuest && onLoginAsGuest()}>
          login as a guest
        </button>
      </div>
    </div>
  )
}
