import React from 'react'
import './App.css'
import {
	BrowserRouter, Route, Link, Switch,
} from 'react-router-dom'

import { ProvideAuth, useAuth } from './components/useAuth'
import Home from './components/Home'
import { LogIn, SignUp, Profile } from './components/User'
import Feedback from './components/Feedback'

function NavBar() {
	const auth = useAuth()

	const a = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/user/login">Login</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/user/signup">Signup</Link>
			</li>
		</ul>
	)

	const b = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item dropdown show" style={{ padding: '8px' }}>
				<span style={{ color: 'white' }}>Welcome&nbsp;</span>
				{/* @ts-ignore */}
				<button type="button" className="dropdown-toggle btn btn-info" data-toggle="dropdown">
					{/* @ts-ignore */}
					{auth.userName}
				</button>
				<div className="dropdown-menu">
					<Link className="dropdown-item" to="/user/profile">
						Profile
					</Link>
				</div>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/">
					{/* @ts-ignore */}
					<button type="button" className="btn btn-info" onClick={auth.signOut}>Logout</button>
				</Link>
			</li>
		</ul>
	)

	// @ts-ignore
	return !auth.isAuthenticate ? a : b
}

// Top level App component
function App() {
	return (
		// What {useAuth} Hooks need first.
		<ProvideAuth>
			{/* What {react-router-dom} need first. */}
			<BrowserRouter>
				<main>
					<nav className="navbar navbar-expand-md navbar-dark bg-dark">
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarToggleExternalContent"
							aria-controls="navbarToggleExternalContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="toggle collapse navbar-collapse" id="navbarToggleExternalContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<Link className="nav-link" to="/">Home</Link>
								</li>
							</ul>
							<NavBar />
						</div>
					</nav>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/user/login" component={LogIn} />
						<Route path="/user/signup" component={SignUp} />
						<Route path="/user/profile" component={Profile} />
						<Route path="/user/feedback" component={Feedback} />
						<Route render={() => <h1>404: page not found</h1>} />
					</Switch>
				</main>
			</BrowserRouter>
		</ProvideAuth>
	)
}

export default App
