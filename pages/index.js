import {FeaturedPosts} from "../sections/index"
import {PostCard, Categories, PostWidget} from "../components"
import {getPosts} from "../services"
import {DOMAIN, APP_NAME} from "../config"
import Head from "next/head"


export default function Home({posts}) {
	const head = () => (
		<Head>
			<title>{`${APP_NAME}`}</title>
			<meta
				name="description"
				content="I started a new university life at UMP. And this blog is my stories about it."
			/>
			<meta http-equiv="refresh" content="3600" />

			<meta
				name="keywords"
				content="hovah yii, blog, UMP, tb20091, ump life, programming, devotion, studies, book review"
			/>
			<meta name="author" content="Hovah Yii" />
			<link rel="canonical" href={`${DOMAIN}`} />
			<meta property="og:title" content={`${APP_NAME}`} />
			<meta
				property="og:description"
				content="I started a new university life at UMP. And this blog is my stories about it."
			/>
			<meta property="og:type" content="webiste" />
			<meta property="og:url" content={`${DOMAIN}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/logo.png`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/logo.png`} />
			<meta property="og:image:type" content="image/png" />
			<script
				data-name="BMC-Widget"
				data-cfasync="false"
				src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
				data-id="hovahyii"
				data-description="Support me on Buy me a ☕!"
				data-message="Like this blog? Buy me a ☕ "
				data-color="#FFDD00"
				data-position="Right"
				data-x_margin="18"
				data-y_margin="60"
			></script>
		</Head>
	)
	return (
		<>
			{head()}
			<div className="container mx-auto px-10 mb-8">
				<FeaturedPosts />
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="lg:col-span-8 col-span-1">
						{posts.map((post, index) => (
							<PostCard key={index} post={post.node} />
						))}
					</div>
					<div className="lg:col-span-4 col-span-1">
						<div className="lg:sticky relative top-8">
							<PostWidget />
							<Categories />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// Fetch data at build time
export async function getStaticProps() {
	const posts = (await getPosts()) || []
	return {
		props: {posts},
	}
}
