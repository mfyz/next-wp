import axios from 'axios'

import { WP_API_BASE } from '../config'
import { BOOKS_LIST, BOOK_DETAIL } from '../const'

export const getBooks = (dispatch) => () => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/books`)
		.then((res) => {
			// console.log('--> page list api response', res)
			if (dispatch) dispatch({
				type: BOOKS_LIST,
				books: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})

export const getBookBySlug = (dispatch) => (bookSlug) => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/books?slug=${bookSlug}`)
		.then((res) => {
			// console.log('--> page detail api response', res)
			if (dispatch) dispatch({
				type: BOOK_DETAIL,
				detail: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})
