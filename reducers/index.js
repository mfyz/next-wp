import pageReducer from './pages'
import postReducer from './posts'
import bookReducer from './books'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	page: pageReducer,
	post: postReducer,
	book: bookReducer
})

export default rootReducer