import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'

import { wrapper } from '../store'
import { getBooks } from '../actions'
import Layout from '../components/layout'

class Books extends React.Component {
	componentDidMount() {
		const { getBooksAction } = this.props
		getBooksAction()
	}

	render() {
		const { books, booksServer } = this.props

		const booksList = books || booksServer

		return (
			<Layout>
				<Head>
					<title>Books List</title>
				</Head>
				<h1>Books</h1>
				<ul>
					{booksList.map((book) => (
						<li key={book.id}>
							{/* <pre>{JSON.stringify(book, null, 4)}</pre> */}
							<Link
								href={`/book/[bookSlug]`}
								as={`/book/${book.slug}`}
							>
								<a>{book.title.rendered}</a>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
	const booksServer = await getBooks(store.dispatch)()
	return {
		props: { booksServer }
	}
})

const mapStateToProps = state => ({
	books: state.book.books
})

const mapDispatchToProps = (dispatch) => ({
	getBooksAction: getBooks(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
