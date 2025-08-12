import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import './assets/Login.scss'
import api from '../../api/api'
import { setCredentials, setUser } from '../../store/slices/authSlice'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
  const dispatch = useDispatch()

	const handleLogin = async (e) => {
		e.preventDefault()

		if (!email || !password) {
			alert('Please enter both email and password')
			return
		}

		try {
			const res = await api.post('/auth/login', {email, password})
			console.log(res)
			dispatch(setCredentials({ token: res.data.data.token }));
			dispatch(setUser({ ...res.data.data.user }));
			navigate('/dashboard')
		} catch (err) {
			console.error(err.message)
			alert('Login failed!')
		}
	}

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}