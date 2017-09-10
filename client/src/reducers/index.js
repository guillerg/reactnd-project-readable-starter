import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  VOTE_POST,
  LOAD_COMMENTS
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
    case LOAD_POST :
      const { post } = action
      return {
        ...state,
        [post.id]: post,
      }
    case VOTE_POST :
      const { postId, score } = action
      return {
        ...state,
        [postId]: {
          ...state[postId],
          voteScore: score
        }
      }

    default :
      return state
  }
}

function comments ( state = {}, action ) {
  switch (action.type) {
    case LOAD_COMMENTS :
      const { postId, body } = action
      return {
        ...state,
        [postId]: body,
        }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
