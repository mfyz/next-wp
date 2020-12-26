import { BOOKS_LIST, BOOK_DETAIL } from '../const'

const INITIAL_STATE = {
	books: null,
	detail: null,
}

const bookReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case BOOKS_LIST:
			return { ...state, books: action.books }
		case BOOK_DETAIL:
			return { ...state, detail: action.detail }
		default:
			return { ...state }
	}
}

export default bookReducer
