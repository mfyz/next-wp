import axios from 'axios'

import { WP_API_BASE } from '../config'
import { PAGES_LIST, PAGE_DETAIL } from '../const'

export const getPages = (dispatch) => () => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/pages`)
		.then((res) => {
			// console.log('--> page list api response', res)
			if (dispatch) dispatch({
				type: PAGES_LIST,
				pages: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})

export const getPageBySlug = (dispatch) => (pageSlug) => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/pages?slug=${pageSlug}`)
		.then((res) => {
			// console.log('--> page detail api response', res)
			if (dispatch) dispatch({
				type: PAGE_DETAIL,
				detail: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})
