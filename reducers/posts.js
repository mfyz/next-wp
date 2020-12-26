import { POSTS_LIST, POST_DETAIL } from '../const'

const INITIAL_STATE = {
	posts: null,
	detail: null,
}

const postReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case POSTS_LIST:
			return { ...state, posts: action.posts }
		case POST_DETAIL:
			return { ...state, detail: action.detail }
		default:
			return { ...state }
	}
}

export default postReducer
