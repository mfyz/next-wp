import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'

import { wrapper } from '../store'
import { getPosts } from '../actions'
import Layout from '../components/layout'

class Posts extends React.Component {
	componentDidMount() {
		const { getPostsAction } = this.props
		getPostsAction()
	}

	render() {
		const { posts, postsServer } = this.props

		const postsList = posts || postsServer

		return (
			<Layout>
				<Head>
					<title>Posts List</title>
				</Head>
				<h1>Posts</h1>
				<ul>
					{postsList.map((post) => (
						<li key={post.id}>
							{/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
							<Link
								href={`/post/[postSlug]`}
								as={`/post/${post.slug}`}
							>
								<a>{post.title.rendered}</a>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
	const postsServer = await getPosts(store.dispatch)()
	return {
		props: { postsServer }
	}
})

const mapStateToProps = state => ({
	posts: state.post.posts
})

const mapDispatchToProps = (dispatch) => ({
	getPostsAction: getPosts(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
