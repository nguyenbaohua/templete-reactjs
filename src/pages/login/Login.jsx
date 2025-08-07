import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './assets/Login.scss'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			if (!username || !password) {
				alert('Please enter both username and password')
				return
			}

			// const endpoint = 'api/auth/login'
			const endpoint = 'https://fakestoreapi.com/auth/login'
			// https://fakestoreapi.com/auth/login , username: mor_2314, password: 83r5^_

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			})
			if (!response.ok) throw new Error('Login failed')
			const data = await response.json()
			console.log('Login success:', data)
			// Lưu token nếu cần: localStorage.setItem('token', data.token)
			navigate('/')
		} catch (error) {
			console.error(error)
			alert('Login failed!')
		}
	}

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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