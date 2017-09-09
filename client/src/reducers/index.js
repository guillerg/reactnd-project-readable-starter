import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
} from '../actions'

function categories( state = {}, action){
  switch (action.type) {
    case LOAD_CATEGORIES:
      const { categories } = action
      return {
      ...state,
      categories,
      }
    default:
      return state
  }
}

function posts ( state = {}, action ) {
  switch (action.type) {
    case LOAD_POSTS :
      const { posts } = action
      return {
        ...state,
        posts,
        }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
