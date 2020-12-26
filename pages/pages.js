import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'

import { wrapper } from '../store'
import { getPages } from '../actions'
import Layout from '../components/layout'

class Pages extends React.Component {
	componentDidMount() {
		const { getPagesAction } = this.props
		getPagesAction()
	}

	render() {
		const { pages, pagesServer } = this.props

		const pagesList = pages || pagesServer

		return (
			<Layout>
				<Head>
					<title>Pages List</title>
				</Head>
				<h1>Pages</h1>
				<ul>
					{pagesList.map((page) => (
						<li key={page.id}>
							{/* <pre>{JSON.stringify(page, null, 4)}</pre> */}
							<Link
								href={`/page/[pageSlug]`}
								as={`/page/${page.slug}`}
							>
								<a>{page.title.rendered}</a>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
	const pagesServer = await getPages(store.dispatch)()
	return {
		props: { pagesServer }
	}
})

const mapStateToProps = state => ({
	pages: state.page.pages
})

const mapDispatchToProps = (dispatch) => ({
	getPagesAction: getPages(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
