import { useNavigate } from 'react-router-dom'
import { ValidAuthModal } from '../cmps/ValidAuthModal'
import { useAuthContext } from '../context/AuthContext'
import { gameStateService } from '../services/gameStateService'

interface props {
  onLoginAsGuest: (() => Promise<void>) | null
}

export const Home = ({ onLoginAsGuest }: props) => {
  const navigate = useNavigate()
  const authContextData = useAuthContext()

  const onStartNewGame = async (
    isOnline: boolean,
    isPlayWithComputer: boolean = false
  ) => {
    const userId = authContextData?.loggedInUser?._id || 'Guest'
    const newGame = gameStateService.getNewGame(
      userId,
      isOnline,
      isPlayWithComputer
    )
    const stateId = await gameStateService.setNewState(newGame)
    if (stateId) navigate(`/${stateId}`)
  }

  const gameOptions = [
    {
      title: "Play Online",
      description: "Challenge a friend from anywhere in the world",
      icon: "🌐",
      gradient: "from-blue-500 to-purple-600",
      action: () => onStartNewGame(true),
      featured: true
    },
    {
      title: "Play Offline",
      description: "Classic local multiplayer experience",
      icon: "👥",
      gradient: "from-green-500 to-teal-600",
      action: () => onStartNewGame(false)
    },
    {
      title: "vs Computer",
      description: "Test your skills against AI",
      icon: "🤖",
      gradient: "from-orange-500 to-red-600",
      action: () => onStartNewGame(false, true)
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary">

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent animate-glow">
              iChess
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the timeless game of chess with modern design and seamless online play
          </p>
          <div className="flex items-center justify-center space-x-2 text-text-muted">
            <span className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></span>
            <span className="text-sm">Real-time multiplayer • AI opponents • Beautiful interface</span>
          </div>
        </div>

        {/* Game Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gameOptions.map((option, index) => (
            <div
              key={option.title}
              className={`
                group relative p-8 rounded-2xl backdrop-blur-md border border-glass-border
                transition-all duration-300 hover:scale-105 hover:shadow-elevated
                animate-slide-up cursor-pointer
                ${option.featured ?
                  'bg-gradient-to-br from-surface-glass to-accent-primary/10 ring-2 ring-accent-primary/50' :
                  'bg-surface-glass hover:bg-surface-glass/80'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={option.action}
            >
              {option.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors duration-300">
                  {option.title}
                </h3>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  {option.description}
                </p>
                <button
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-white
                    bg-gradient-to-r ${option.gradient}
                    hover:shadow-glow transition-all duration-300
                    transform group-hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary
                  `}
                >
                  Start Game
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Why Choose iChess?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-surface-glass backdrop-blur-md border border-glass-border">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Lightning Fast</h3>
              <p className="text-text-secondary text-sm">Optimized for speed with real-time synchronization</p>
            </div>
            <div className="p-6 rounded-xl bg-surface-glass backdrop-blur-md border border-glass-border">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Beautiful Design</h3>
              <p className="text-text-secondary text-sm">Modern, elegant interface that's easy on the eyes</p>
            </div>
            <div className="p-6 rounded-xl bg-surface-glass backdrop-blur-md border border-glass-border">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Secure & Private</h3>
              <p className="text-text-secondary text-sm">Your games and data are protected with end-to-end security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {!authContextData?.loggedInUser && (
        <ValidAuthModal onLoginAsGuest={onLoginAsGuest} />
      )}
    </div>
  )
}
