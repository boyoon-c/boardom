import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import * as authService from '../../services/authService'

class LoginForm extends Component {
  state = {
    email: '',
    pw: '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    const { history, handleSignupOrLogin } = this.props
    e.preventDefault()
    try {
      await authService.login(this.state);
      handleSignupOrLogin()
      history.push("/")
    } catch (err) {
        alert('Invalid Credentials')
    }
  }

  render() {
    const { email, pw } = this.state
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={styles.container}
      >
  <div class="container text-sm mx-auto max-w-md ">
    <div class="p-1 bg-white rounded-xl py-3  hover:shadow-2xl">
      <div class="m-3 fs-4 text-center">
        Log In
      </div>
      <div class="mb-6">  
          <label htmlFor="email" class="ml-4 text-sm mr-4 font-bold inline-block mb-1">Email</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" class="ml-4 text-sm mr-2 font-bold inline-block mb-1">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={pw}
            name="pw"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 rounded mr-3"
          />
        </div>
        <div>
          <button class="ml-4 w-32 text-indigo-50 font-bold bg-indigo-600 py-2 rounded-md hover:bg-indigo-500 transition duration-300">Log In</button>
          <Link to="/">
            <button class="w-32 text-indigo-50 font-bold bg-yellow-600 py-2 rounded-md hover:bg-indigo-500 transition duration-300">Cancel</button>
          </Link>
        </div>
        </div>
        </div>
      </form>
    )
  }
}

export default LoginForm
