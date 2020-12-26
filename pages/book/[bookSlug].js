import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'
import parse from 'html-react-parser'

import { wrapper } from '../../store'
import { getBookBySlug, getBooks } from '../../actions'
import Layout from '../../components/layout'

class BookDetail extends React.Component {
	componentDidMount() {
		const { getBookBySlugAction, router } = this.props
		const { bookSlug } = router.query
		getBookBySlugAction(bookSlug)
	}

	render() {
		const { detail, bookServer, router } = this.props
		const { postSlug } = router.query
		const bookDetail = (detail || bookServer)[0]
		console.log('--> bookDetail', bookDetail)

		const yoastHead = parse(bookDetail.yoast_head)

		return (
			<Layout>
				<Head>
					{yoastHead}
				</Head>
				{/* <pre>{JSON.stringify(bookDetail, null, 4)}</pre> */}
				<h1 dangerouslySetInnerHTML={{ __html: bookDetail.title.rendered }} />
				{bookDetail.acf.publish_year ? <h3>Publish Year: {bookDetail.acf.publish_year} (ACF)</h3> : ''}
				<div dangerouslySetInnerHTML={{ __html: bookDetail.content.rendered }} />
			</Layout>
		)
	}
}

export async function getStaticPaths() {
	const paths = []
	
	const bookList = await getBooks()()
	// console.log('--> bookList', bookList)
	bookList.forEach((book) => {
		paths.push({ params: { bookSlug: book.slug } })
	})

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
	const bookServer = await getBookBySlug(store.dispatch)(params.bookSlug)
	return {
		props: { bookServer },
		revalidate: 60 // SSR will be incrementally refreshed every 60 seconds (if there is any hit)
	}
})

const mapStateToProps = state => ({
	book: state.book.detail
})

const mapDispatchToProps = (dispatch) => ({
	getBookBySlugAction: getBookBySlug(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookDetail))
