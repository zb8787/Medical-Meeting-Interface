import React, { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

export function SignUp() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		category: '',
	})
	const auth = useAuth()
	// @ts-ignore
	function handleRegister(event) {
		console.log(user)
		// @ts-ignore
		auth.signUp(user)
		event.preventDefault()
	}

	const signupForm = (
		<div>
			{/* @ts-ignore */}
			{auth.error ? <p className="alert alert-danger" role="alert">Email has been registered</p> : null}
			<form
				style={{
					width: '500px',
					background: 'whitesmoke',
					margin: '20px 0 0 0',
					padding: '40px',
					display: 'inline-block',
					textAlign: 'left',
				}}
				onSubmit={handleRegister}
			>
				<div className="form-group">
					<label htmlFor="username" className="col-form-label">
						<b>Username</b>
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						placeholder="pick a nickname"
						onChange={
							(e: ChangeEvent<HTMLInputElement>) => {
								setUser({ ...user, username: e.target.value })
							}
						}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="col-form-label">
						<b>Email</b>
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="hello@world.com"
						onChange={
							(e: ChangeEvent<HTMLInputElement>) => {
								setUser({ ...user, email: e.target.value })
							}
						}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="col-form-label">
						<b>Password</b>
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="*******"
						minLength={7}
						onChange={
							(e: ChangeEvent<HTMLInputElement>) => {
								setUser({ ...user, password: e.target.value })
							}
						}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="category" className="col-form-label">
						<b>Category</b>
					</label>
					<select
						className="form-control"
						id="category"
						onChange={(event: ChangeEvent<HTMLSelectElement>) => {
							setUser({
								...user,
								category: event.target.value,
							})
						}}
						required
					>
						{/* leave the 1st option value to be empty, to fire on <select> validation */}
						<option value="">Choose...</option>
						<option value="0">doctor</option>
						<option value="1">patient</option>
					</select>
				</div>
				<div className="form-group text-center">
					<button type="submit" className="btn btn-success">Register</button>
				</div>
			</form>
		</div>
	)

	// @ts-ignore
	return !auth.isSignup ? signupForm : <Redirect to="/user/login" />
}

export function LogIn() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	const auth = useAuth()
	// @ts-ignore
	function handleLogIn(event) {
		// @ts-ignore
		auth.signIn(user)
		event.preventDefault()
	}

	const loginForm = (
		<div>
			{/* @ts-ignore */}
			{auth.error ? <p className="alert alert-danger" role="alert">check your email and password</p> : null}
			<form
				style={{
					width: '500px',
					background: 'whitesmoke',
					margin: '20px 0 0 0',
					padding: '40px',
					display: 'inline-block',
					textAlign: 'left',
				}}
				onSubmit={handleLogIn}
			>
				<div className="form-group">
					<label htmlFor="email" className="col-form-label">
						<b>Email</b>
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="hello@world.com"
						onChange={
							(e: ChangeEvent<HTMLInputElement>) => {
								setUser({ ...user, email: e.target.value })
							}
						}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="col-form-label">
						<b>Password</b>
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="*******"
						minLength={7}
						onChange={
							(e: ChangeEvent<HTMLInputElement>) => {
								setUser({ ...user, password: e.target.value })
							}
						}
						required
					/>
				</div>
				<div className="form-group text-center">
					<button type="submit" className="btn btn-success">Login</button>
				</div>
			</form>
		</div>
	)

	// @ts-ignore
	return !auth.isAuthenticate ? loginForm : <Redirect to="/" />
}

export function Profile() {
	const auth = useAuth()
	// @ts-ignore
	const { profile } = auth

	return profile ? (
		<div className="card bg-light mb-3 mx-auto" style={{ maxWidth: '18rem' }}>
			<div className="card-header">{profile.username}</div>
			<div className="card-body">
				<h5 className="card-title">{profile.admin ? 'Admin' : 'User'}</h5>
				<p className="card-text">{profile.email}</p>
				<p className="card-text">{profile.category ? 'Patient' : 'Doctor'}</p>
			</div>
		</div>
	) : null
}
