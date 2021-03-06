import React from 'react'
import moment from "moment"
import Head from "next/head"
import { DOMAIN, APP_NAME} from "../config"
import { RichText } from '@graphcms/rich-text-react-renderer'

const PostDetail = ({ post }) => {

	   const head = () => (
				<Head>
					<title>
						{post.title} | {APP_NAME}
					</title>
					<meta name="description" content={post.excerpt} />
					<meta name="keywords" content={post.keywords} />
					<meta name="author" content="Hovah Yii" />

					<link rel="canonical" href={post.slug} />
					<meta property="og:title" content={`${post.title} | ${APP_NAME}`} />
					<meta property="og:description" content={post.excerpt} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${DOMAIN}/blogs/${post.slug}`} />
					<meta property="og:site_name" content={`${APP_NAME}`} />
					<meta property="og:image" content={post.featuredImage.url} />
					<meta
						property="og:image:secure_url"
						ccontent={post.featuredImage.url}
					/>
					<meta property="og:image:type" content="image/jpg" />
					<script
						type="text/javascript"
						src="https://platform-api.sharethis.com/js/sharethis.js#property=61a0931fe34ea500192d19c7&product=sop"
						async="async"
					></script>
				</Head>
			)

	const getContentFragment = (index, text,  obj, type) => {
		let modifiedText = text

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>
			}

			if (obj.link){
				modifiedText = 
					<a
						key={index}
						href={obj.url}
						className="underline"
						title={obj.name}
						target={openInNewTab ? "_blank" : "_self"}
						rel={rel || "noopener noreferrer"}
					>
						{text}
					</a>
				
			}

		}

		switch (type) {
			case "heading-three":
				return (
					<h3 key={index} className="text-xl font-semibold mb-4">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				)

			case "paragraph":
				return (
					<p key={index} className="mb-8">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				)
			case "heading-four":
				return (
					<h4 key={index} className="text-md font-semibold mb-4">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				)
			case "image":
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				)
			case "quote":
				return (
					<blockquote key={index} className="mb-8">
						{" "}
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</blockquote>
				)

			default:
				return modifiedText
		}
	}




	return (
		<>
			{head()}
			<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
				<div className="relative overflow-hidden shadow-md mb-6">
					<img
						src={post.featuredImage.url}
						alt={post.featuredImage.name}
						className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
					/>
				</div>
				<div className="px-4 lg:px-0">
					<div className="flex items-center mb-8 w-full">
						<div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
							<img
								alt={post.author.name}
								height="30px"
								width="30px"
								className="align-middle rounded-full"
								src={post.author.photo.url}
							/>
							<p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
								{post.author.name}
							</p>
						</div>
						<div className="font-medium text-gray-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 inline mr-2 text-blue-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span className="align-middle">
								{moment(post.createdAt).format("MMM DD, YYYY")}
							</span>
						</div>
					</div>
					<h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

					<RichText
						content={post.content.raw.children}
						renderers={getContentFragment}
					></RichText>
					{/* {post.content.raw.children.map((typeObj, index) => {
						const children = typeObj.children.map((item, itemIndex) =>
							getContentFragment(itemIndex, item.text, item)
						)

						return getContentFragment(index, children, typeObj, typeObj.type)
					})}  */}
				</div>
			</div>
		</>
	)
}

export default PostDetail