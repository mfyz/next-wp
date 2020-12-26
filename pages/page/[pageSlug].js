import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'

import { wrapper } from '../../store'
import { getPageBySlug, getPages } from '../../actions'
import Layout from '../../components/layout'

class PageDetail extends React.Component {
	componentDidMount() {
		const { getPageBySlugAction, router } = this.props
		const { pageSlug } = router.query
		getPageBySlugAction(pageSlug)
	}

	render() {
		const { detail, pageServer, router } = this.props
		const { postSlug } = router.query
		const pageDetail = (detail || pageServer)[0]

		return (
			<Layout>
				<Head>
					<title>Page: {pageDetail.title.rendered}</title>
				</Head>
				{/* <pre>{JSON.stringify(pageDetail, null, 4)}</pre> */}
				<h1 dangerouslySetInnerHTML={{ __html: pageDetail.title.rendered }} />
				<div dangerouslySetInnerHTML={{ __html: pageDetail.content.rendered }} />
			</Layout>
		)
	}
}

export async function getStaticPaths() {
	const paths = []
	
	const pageList = await getPages()()
	// console.log('--> pageList', pageList)
	pageList.forEach((page) => {
		paths.push({ params: { pageSlug: page.slug } })
	})

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
	const pageServer = await getPageBySlug(store.dispatch)(params.pageSlug)
	return {
		props: { pageServer },
		revalidate: 60 // SSR will be incrementally refreshed every 60 seconds (if there is any hit)
	}
})

const mapStateToProps = state => ({
	page: state.page.detail
})

const mapDispatchToProps = (dispatch) => ({
	getPageBySlugAction: getPageBySlug(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageDetail))
