import React, {
	ChangeEvent, useState, useEffect, MouseEvent, FormEvent,
} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'
import URL from './baseUrl'

const padding = {
	color: '#fff',
	padding: '0 16px',
}

// Any component that wants auth state.
function Home() {
	// Get auth state and re-render anytime it changes.
	const auth = useAuth()
	const {
		// @ts-ignore
		isAuthenticate, labels, profile, handleFeedback, hasSubmitted,
	} = auth
	/**
	 * default labels should be immutable,
	 * and selected labels should be mutable.
	 */
	let defaultLabels: any
	const classNameList = ['primary', 'secondary', 'success', 'info', 'dark']
	const [selectedLabels, setSelectedLabels] = useState([])
	const [customLabel, setCustomLabel] = useState('')
	const [audioFile, setAudioFile]: any[] = useState([])
	const [uploadStatus, setUploadStatus] = useState(false)

	const handleSelect = (e: any) => {
		if (e.target.tagName !== 'SPAN') {
			return null
		}

		const { key } = e.target.dataset
		// @ts-ignore
		// eslint-disable-next-line no-underscore-dangle
		const selectedLabel = labels.filter((label) => label._id === key)[0]
		// @ts-ignore
		setSelectedLabels((prevState) => [...prevState, selectedLabel])
		// e.target.style.display = 'none'
		e.target.style.visibility = 'hidden'
		return null
	}

	const deSelect = async (e: any) => {
		if (e.target.tagName !== 'SPAN') {
			return null
		}

		const { key } = e.target.dataset
		// eslint-disable-next-line no-underscore-dangle
		const isCustomLabel = labels.filter((label: any) => label._id === key).length === 0
		console.log('isCustomLabel', isCustomLabel)

		/**
		 * if target label is user custom label, then delete it from database also,
		 * else just display default corresponding hidden label.
		 */

		if (!isCustomLabel) {
			const hiddenBadge = document.getElementById(key)
			// @ts-ignore
			// hiddenBadge.style.display = 'inline-block'
			hiddenBadge.style.visibility = 'visible'
		} else {
			try {
				const TOKEN = localStorage.getItem('jwt')
				await axios({
					method: 'delete',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${TOKEN}`,
					},
					url: `/label/${key}`,
					baseURL: URL,
				})
			} catch (err) {
				console.error(err)
			}
		}
		setSelectedLabels(
			(prevState) => prevState.filter(
				(label: {
					_id: string, category: string, description: string
					// eslint-disable-next-line no-underscore-dangle
				}) => label._id !== key,
			),
		)
		return null
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		// @ts-ignore
		document.getElementById('labelButton').disabled = !e.target.value
		setCustomLabel(e.target.value)
	}

	const addLabel = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (customLabel !== '') {
			try {
				const TOKEN = localStorage.getItem('jwt')
				const response = await axios({
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${TOKEN}`,
					},
					url: '/label',
					baseURL: URL,
					data: { description: customLabel },
				})
				console.log(response.data)
				const { label } = response.data
				const {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					_id, category, description, completed,
				} = label
				// @ts-ignore
				setSelectedLabels((prevState) => [
					...prevState,
					{
						_id, category, description, completed,
					},
				])
				console.log('added a new label')
				setCustomLabel('')
			} catch (err) {
				console.error(err)
			}
		} else {
			console.log('noting you wrote!!!')
		}
	}

	const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAudioFile(e.target.files[0])
		} else {
			console.log('no file uploaded')
		}
	}

	const uploadFile = async (e: any) => {
		console.log(audioFile)
		e.preventDefault()
		try {
			const TOKEN = localStorage.getItem('jwt')
			const formData = new FormData()
			formData.append('upload', audioFile)
			const response = await axios({
				method: 'post',
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
				url: '/upload',
				baseURL: URL,
				data: formData,
			})
			console.log(response.data)
			setUploadStatus(true)
		} catch (err) {
			console.error(err)
		}
	}

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (uploadStatus && selectedLabels.length !== 0) {
			handleFeedback(selectedLabels)
			setUploadStatus(false)
		}
		e.preventDefault()
	}

	useEffect(() => {
		console.log(selectedLabels)
	}, [selectedLabels])

	if (isAuthenticate && labels) {
		const categorySet: any[] = []
		labels.forEach((label: { _id: string, category: string, description: string }) => {
			if (!categorySet.includes(label.category)) {
				categorySet.push(label.category)
			}
		})

		// TODO toast fixed size
		defaultLabels = categorySet.map((category) => (
			<div key={category} className="p-3 my-2 rounded">
				<div className="toast show h-100">
					<div className="toast-header">{category}</div>
					{/* eslint-disable-next-line max-len */}
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
					<div className="toast-body" onClick={handleSelect}>
						{labels.map((label: any) => (
							(label.category === category)
								// eslint-disable-next-line no-underscore-dangle
								? <span key={label._id} data-key={label._id} id={label._id} className={`badge badge-${classNameList[Math.floor(Math.random() * 5)]}`}>{label.description}</span>
								: null
						))}
					</div>
				</div>
			</div>
		))
	}

	/**
	 * just need to submit the audio file and selected labels.
	 */
	const protectedPage = (
		<div style={{ padding: '50px 60px 0px 60px' }}>
			<h3 style={padding}>{(profile && profile.category === 0) ? 'Doctor' : 'Patient'}</h3>
			<div style={{ textAlign: 'left' }}>
				<form style={padding} onSubmit={uploadFile}>
					<div className="form-group">
						<input style={{ background: 'gainsboro', color: 'black' }} type="file" accept=".m4a,.mp3,.wav" name="upload" className="form-control-file" id="audioFile" onChange={handleUploadFile} required />
						<label htmlFor="audioFile">
							Please upload your audio file
						</label>
						{'  '}
						<button type="submit" className="btn btn-success">upload</button>
					</div>
				</form>
				<div style={{ display: 'flex' }}>
					{defaultLabels}
				</div>
				<form style={padding} onSubmit={addLabel}>
					<div className="form-group">
						<label htmlFor="customLabel">Add your custom label: </label>
						<input type="text" id="customLabel" className="form-control" placeholder="custom label" value={customLabel} onChange={handleChange} required />
					</div>
					<button type="submit" className="btn btn-success" disabled id="labelButton">Add</button>
				</form>
				<div className="p-3 my-2 rounded">
					<div className="toast show">
						<div className="toast-header">
							Selected Labels
						</div>
						{/* eslint-disable-next-line max-len */}
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
						<div className="toast-body" onClick={deSelect}>
							{/* @ts-ignore */ /* eslint-disable-next-line no-underscore-dangle */}
							{selectedLabels.map((selectedLabel) => <span key={selectedLabel._id} data-key={selectedLabel._id} className={`badge badge-${classNameList[Math.floor(Math.random() * 5)]}`}>{selectedLabel.description}</span>)}
						</div>
					</div>
				</div>
			</div>
			<button type="button" className="btn btn-primary text-center" id="submit" onClick={handleClick}>Submit</button>
		</div>
	)

	if (isAuthenticate) {
		if (hasSubmitted) {
			return <Redirect to="/user/feedback" />
		}
		return protectedPage
	}
	return <h1>You need to log in first.</h1>
}

export default Home
