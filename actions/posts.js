import axios from 'axios'

import { WP_API_BASE } from '../config'
import { POSTS_LIST, POST_DETAIL } from '../const'

export const getPosts = (dispatch) => () => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/posts`)
		.then((res) => {
			// console.log('--> page list api response', res)
			if (dispatch) dispatch({
				type: POSTS_LIST,
				posts: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})

export const getPostBySlug = (dispatch) => (postSlug) => new Promise((resolve, reject) => {
	axios.get(`${WP_API_BASE}/posts?slug=${postSlug}`)
		.then((res) => {
			// console.log('--> page detail api response', res)
			if (dispatch) dispatch({
				type: POST_DETAIL,
				detail: res.data
			})
			resolve(res.data)
		})
		.catch(reject)
})
