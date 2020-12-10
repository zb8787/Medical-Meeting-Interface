import React, {
	createContext, useContext, useState,
} from 'react'
import axios from 'axios'
import URL from './baseUrl'

// @ts-ignore
const authContext = createContext()

/**
 * Provider hook that creates auth object and handles state.
 */
function useProvideAuth() {
	const [userName, setUserName] = useState(null)
	const [isAuthenticate, setIsAuthenticate] = useState(false)
	const [isSignup, setIsSignup] = useState(false)
	const [error, setError] = useState(false)
	const [profile, setProfile] = useState(null)
	const [labels, setLabels] = useState(null)
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [feedback, setFeedback] = useState('')
	const [feedbackLabels, setFeedbackLabels] = useState([])

	const getProfile = async () => {
		try {
			const TOKEN = localStorage.getItem('jwt')
			console.log(TOKEN)
			const response = await axios({
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${TOKEN}`,
				},
				url: '/user/profile',
				baseURL: URL,
			})
			console.log('res: ', response.data)
			setError(false)
			setProfile(response.data)
		} catch (e) {
			console.error(e)
			setError(true)
		}
	}

	const fetchLabel = async () => {
		try {
			const TOKEN = localStorage.getItem('jwt')
			const response = await axios({
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${TOKEN}`,
				},
				url: '/label',
				baseURL: URL,
			})

			const { data } = response.data
			setError(false)
			setLabels(data)
		} catch (e) {
			console.error(e)
			setError(true)
		}
	}

	// @ts-ignore
	const signIn = async (user) => {
		try {
			const response = await axios({
				method: 'post',
				headers: { 'Content-Type': 'Application/json' },
				url: '/user/login',
				baseURL: URL,
				data: user,
			})
			const { username, token } = response.data
			localStorage.setItem('jwt', token)
			await getProfile()
			await fetchLabel()
			setIsAuthenticate(true)
			setUserName(username)
			setError(false)
		} catch (e) {
			// console.error(e)
			setError(true)
		}
	}
	// @ts-ignore
	const signUp = async (user) => {
		try {
			const response = await axios({
				method: 'post',
				headers: {
					'Content-Type': 'Application/json',
				},
				url: '/user/signup',
				baseURL: URL,
				data: user,
			})
			console.log('jwt: ', response.data)
			setIsSignup(true)
			setError(false)
		} catch (e) {
			console.error(e.response.status)
			setError(true)
		}
	}
	const signOut = async () => {
		try {
			await axios({
				method: 'get',
				url: '/user/logout',
				baseURL: URL,
			})
			setIsAuthenticate(false)
			localStorage.removeItem('jwt')
			setFeedback('')
			setFeedbackLabels([])
			setHasSubmitted(false)
		} catch (e) {
			console.error(e)
		}
	}

	const handleFeedback = async (selectedLabels: any) => {
		try {
			const TOKEN = localStorage.getItem('jwt')
			const response = await axios({
				method: 'post',
				headers: {
					'Content-Type': 'Application/json',
					Authorization: `Bearer ${TOKEN}`,
				},
				url: '/user/feedback',
				baseURL: URL,
				data: selectedLabels,
			})
			console.log(response.data)
			setFeedback(response.data.content)
			setFeedbackLabels(response.data.labels)
			console.log('redirect...')
			setHasSubmitted(true)
		} catch (e) {
			console.error(e)
		}
	}

	return {
		userName,
		isAuthenticate,
		isSignup,
		hasSubmitted,
		error,
		profile,
		labels,
		feedback,
		feedbackLabels,
		signIn,
		signUp,
		signOut,
		getProfile,
		fetchLabel,
		handleFeedback,
	}
}

/**
 * Provider component that wraps app and makes auth object available to any child component
 * that calls {useAuth}.
 */
// @ts-ignore
export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return (
		<authContext.Provider value={auth}>
			{children}
		</authContext.Provider>
	)
}

/**
 * Hook for child components to get the auth object and re-render when it changes.
 */
export function useAuth() {
	return useContext(authContext)
}
