import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './assets/Login.scss'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			if (!email || !password) {
				alert('Please enter both email and password')
				return
			}

			const endpoint = 'http://127.0.0.1:3000/api/auth/login'
			// https://fakestoreapi.com/auth/login , mor_2314 / 83r5^_
			// localhost:3000/api/auth/login , admin@example.com / admin123

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
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