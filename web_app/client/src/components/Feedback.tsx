import React, { useEffect } from 'react'
import { useAuth } from './useAuth'

function Feedback() {
	const auth = useAuth()
	const classNameList = ['primary', 'secondary', 'success', 'info', 'dark']
	// @ts-ignore
	const { feedback, feedbackLabels } = auth
	const feedbackArr = feedback.split('\n')
	const text = (
		<div id="highlightText">
			{/* @ts-ignore */}
			{feedbackArr.map((line, index) => <p key={index.toString()}>{line}</p>)}
		</div>
	)
	/**
	 * highlight text.
	 */
	useEffect(() => {
		const highlightDiv = document.getElementById('highlightText')
		if (highlightDiv) {
			// @ts-ignore
			const instance = new Mark(highlightDiv)
			feedbackLabels.forEach((label: any) => {
				const { completed, description } = label
				if (completed) {
					instance.mark(description, {
						element: 'span',
						className: 'badge badge-warning badge-no-hover',
					})
				}
			})
		}
	})

	const includedLabels = feedbackLabels
		.filter((label: any) => label.completed === true)
		// eslint-disable-next-line no-underscore-dangle
		.map((label: any) => <span key={label._id} className={`badge badge-${classNameList[Math.floor(Math.random() * 5)]}`}>{label.description}</span>)

	const excludedLabels = feedbackLabels
		.filter((label: any) => label.completed === false)
		// eslint-disable-next-line no-underscore-dangle
		.map((label: any) => <span key={label._id} className={`badge badge-${classNameList[Math.floor(Math.random() * 5)]}`}>{label.description}</span>)

	return (
		<div className="user-feedback">
			<div className="card" style={{ height: '300px' }}>
				<div className="card-header text-center">Feedback</div>
				<div className="card-body overflow-auto">{text}</div>
			</div>
			<div className="container" style={{ marginTop: '10px', padding: '0px' }}>
				<div className="row">
					<div className="col">
						<div className="toast show h-100" role="alert" style={{ maxWidth: '395px' }}>
							<div className="toast-header">labels included</div>
							<div className="toast-body">{includedLabels}</div>
						</div>
					</div>
					<div className="col">
						<div className="toast show h-100" role="alert" style={{ maxWidth: '395px' }}>
							<div className="toast-header">labels excluded</div>
							<div className="toast-body">{excludedLabels}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feedback
