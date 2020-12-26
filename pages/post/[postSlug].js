import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'

import { wrapper } from '../../store'
import { getPostBySlug, getPosts } from '../../actions'
import Layout from '../../components/layout'

class PostDetail extends React.Component {
	componentDidMount() {
		const { getPostBySlugAction, router } = this.props
		const { postSlug } = router.query
		getPostBySlugAction(postSlug)
	}

	render() {
		const { detail, postServer, router } = this.props
		const { postSlug } = router.query
		const postDetail = (detail || postServer)[0]

		return (
			<Layout>
				<Head>
					<title>Post: {postDetail.title.rendered}</title>
				</Head>
				{/* <pre>{JSON.stringify(postDetail, null, 4)}</pre> */}
				<h1 dangerouslySetInnerHTML={{ __html: postDetail.title.rendered }} />
				<div dangerouslySetInnerHTML={{ __html: postDetail.content.rendered }} />
			</Layout>
		)
	}
}

export async function getStaticPaths() {
	const paths = []
	
	const postList = await getPosts()()
	// console.log('--> postList', postList)
	postList.forEach((post) => {
		paths.push({ params: { postSlug: post.slug } })
	})

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
	const postServer = await getPostBySlug(store.dispatch)(params.postSlug)
	return {
		props: { postServer },
		revalidate: 60 // SSR will be incrementally refreshed every 60 seconds (if there is any hit)
	}
})

const mapStateToProps = state => ({
	post: state.post.detail
})

const mapDispatchToProps = (dispatch) => ({
	getPostBySlugAction: getPostBySlug(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetail))
