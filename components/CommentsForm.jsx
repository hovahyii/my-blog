import React, {useState, useRef, useEffect} from "react"
import {submitComment} from "../services"

const CommentsForm = ({slug}) => {
	const [error, setError] = useState(false)
	const [localStorage, setLocalStorage] = useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const commentEl = useRef()
	const nameEl = useRef()
	const emailEl = useRef()
	const storedDataEl = useRef()

	useEffect(() => {
		nameEl.current.value = window.localStorage.getItem("name")
		emailEl.current.value = window.localStorage.getItem("email")
	}, [])

	const handleCommentSubmission = () => {
		setError(false)
		const {value: comment} = commentEl.current
		const {value: name} = nameEl.current
		const {value: email} = emailEl.current
		const {checked: storedData} = storedDataEl.current

		if (!name || !email || !comment) {
			setError(true)
			return
		}
		const commentObj = {
			name,
			email,
			comment,
			slug,
		}

		if (storedData) {
			window.localStorage.setItem("name", name)
			window.localStorage.setItem("email", email)
		} else {
			window.localStorage.removeItem("name", name)
			window.localStorage.removeItem("email", email)
		}

		submitComment(commentObj).then((res) => {
			setShowSuccessMessage(true)
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 3000)
		})
	}

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Leave a Reply
			</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentEl}
					className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					name="comment"
					placeholder="Comment"
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					type="text"
					ref={nameEl}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Name"
					name="name"
				/>
				<input
					type="email"
					ref={emailEl}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Email"
					name="email"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div>
					<input
						ref={storedDataEl}
						type="checkbox"
						id="storedData"
						name="storedData"
						value="true"
					/>
					<label className="text-gray-500 cursor-pointer" htmlFor="storedData">
						{" "}
						Save my name and email in this browser for the next time I comment.
					</label>
				</div>
			</div>
			{error && (
				<p className="text-xs text-red-500">All fields are required.</p>
			)}
			<div className="mt-8">
				<button
					type="button"
					onClick={handleCommentSubmission}
					className="transition duration-500 ease hover:bg-blue-900 inline-block bg-blue-500 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
				>
					Post Comment
				</button>
				{showSuccessMessage && (
					<span className="text-xl float-right font-semibold mt-3 text-green-500">
						Comment submitted for review
					</span>
				)}
			</div>
		</div>
	)
}

export default CommentsForm
