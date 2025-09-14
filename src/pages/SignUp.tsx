import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const SignUp = () => {
  const navigate = useNavigate()
  const authContextData = useAuthContext()

  const [cred, setCred] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{username?: string; password?: string; fullname?: string}>({})

  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    const value = ev.target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: {username?: string; password?: string; fullname?: string} = {}

    if (!cred.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (cred.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!cred.fullname.trim()) {
      newErrors.fullname = 'Full name is required'
    } else if (cred.fullname.length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters'
    }

    if (!cred.password) {
      newErrors.password = 'Password is required'
    } else if (cred.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await authContextData?.signUp(cred)
      navigate('/')
      setCred({ username: '', password: '', fullname: '' })
    } catch (error) {
      console.error('Sign up failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-block mb-6">
            <h2 className="text-3xl font-bold text-text-primary hover:text-accent-primary transition-colors duration-200">
              ♔ iChess
            </h2>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary">Join the chess community</p>
        </div>

        {/* Form */}
        <div className="backdrop-blur-md bg-surface-glass border border-glass-border rounded-2xl p-8 shadow-elevated animate-slide-up">
          <form onSubmit={submit} className="space-y-6">

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={cred.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  className={`
                    w-full px-4 py-3 rounded-xl
                    bg-background-elevated border transition-all duration-200
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary
                    ${errors.username
                      ? 'border-accent-error bg-accent-error/5'
                      : 'border-glass-border hover:border-glass-border/60'
                    }
                  `}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-text-muted text-sm">👤</span>
                </div>
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-accent-error animate-fade-in">{errors.username}</p>
              )}
            </div>

            {/* Full Name Field */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-text-primary mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={cred.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`
                    w-full px-4 py-3 rounded-xl
                    bg-background-elevated border transition-all duration-200
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary
                    ${errors.fullname
                      ? 'border-accent-error bg-accent-error/5'
                      : 'border-glass-border hover:border-glass-border/60'
                    }
                  `}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-text-muted text-sm">✨</span>
                </div>
              </div>
              {errors.fullname && (
                <p className="mt-2 text-sm text-accent-error animate-fade-in">{errors.fullname}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={cred.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className={`
                    w-full px-4 py-3 rounded-xl
                    bg-background-elevated border transition-all duration-200
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary
                    ${errors.password
                      ? 'border-accent-error bg-accent-error/5'
                      : 'border-glass-border hover:border-glass-border/60'
                    }
                  `}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-text-muted text-sm">🔒</span>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-accent-error animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-white
                bg-gradient-to-r from-accent-primary to-accent-secondary
                hover:shadow-glow transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isLoading ? 'animate-pulse' : 'hover:scale-105'}
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-glass-border">
            <div className="flex flex-col space-y-3 text-center">
              <Link
                to="/sign-in"
                className="text-accent-primary hover:text-accent-primary/80 transition-colors duration-200 font-medium"
              >
                Already have an account? Sign in
              </Link>
              <div className="flex justify-center space-x-4 text-sm">
                <Link
                  to="/sign-in"
                  className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                >
                  Forgot password?
                </Link>
                <span className="text-text-muted">•</span>
                <Link
                  to="/sign-in"
                  className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                >
                  Login with email
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="text-center mt-6 text-text-muted text-sm animate-fade-in">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
