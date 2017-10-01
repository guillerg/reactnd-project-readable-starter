import { combineReducers } from 'redux'

import {
  POSTS_SORT,
} from '../actions'

import { categories } from './categories'
import { posts, addPostForm, editPostForm, deletePostModal } from './posts'

function sortMethod(state = 'score', action) {
  switch (action.type) {
    case POSTS_SORT:
      return action.method
    default :
      return state
  }
}



export default combineReducers({
  categories,
  posts,
  sortMethod,
  addPostForm,
  editPostForm,
  deletePostModal
})
