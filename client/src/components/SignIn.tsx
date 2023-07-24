import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const SignInForm = () => {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })
  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const handleOnSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: state.email,
        password: state.password
      })
      setCookies('access_token', response.data.token)
      window.localStorage.setItem('userID', response.data.userID)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <Link to="/" className="social">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to="/" className="social">
            <i className="fab fa-google-plus-g" />
          </Link>
          <Link to="/" className="social">
            <i className="fab fa-linkedin-in" />
          </Link>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/">Forgot your password?</Link>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignInForm
