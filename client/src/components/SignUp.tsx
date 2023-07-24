import axios from 'axios'
import React, { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/auth/register', {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name
      })
      alert('Registration Completed! Now Login.')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
