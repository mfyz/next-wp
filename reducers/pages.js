import { PAGES_LIST, PAGE_DETAIL } from '../const'

const INITIAL_STATE = {
	pages: null,
	detail: null,
}

const pageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PAGES_LIST:
			return { ...state, pages: action.pages }
		case PAGE_DETAIL:
			return { ...state, detail: action.detail }
		default:
			return { ...state }
	}
}

export default pageReducer
