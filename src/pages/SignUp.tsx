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

  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    const value =
      ev.target.type === 'number' ? +ev.target.value || '' : ev.target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () =>
    setCred(() => ({ username: '', password: '', fullname: '' }))

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!cred.username && !cred.fullname.length && cred.password.length < 4)
      return

    authContextData?.signUp(cred)

    navigate('/')

    cleanFields()
  }

  // console.log('render SignUp()')
  return (
    <div className="sign-up-page">
      <div className="container">
        <form onSubmit={submit} action="">
          <div>
            <h1>Sign up</h1>
          </div>
          <div>
            <label htmlFor="username">
              <p>User name </p>
              <input
                onChange={handleChange}
                placeholder="User name"
                name="username"
                type="text"
                id="username"
                value={cred.username}
              />
            </label>
          </div>
          <div>
            <label htmlFor="fullname">
              <p>Full name</p>
              <input
                onChange={(ev) => handleChange(ev)}
                type="text"
                placeholder="Full name"
                name="fullname"
                id="fullname"
                value={cred.fullname}
              />
            </label>
          </div>
          <div>
            <label htmlFor="userPassword">
              <p>Password</p>
              <input
                onChange={(ev) => handleChange(ev)}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={cred.password}
              />
            </label>
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>

        <div className="bottom-btns">
          <Link to={'/sign-in'}>Sign in</Link>
          <Link to={'/sign-in'}>Reset password</Link>
          <Link to={'/sign-in'}>Login by email</Link>
        </div>
      </div>
    </div>
  )
}
