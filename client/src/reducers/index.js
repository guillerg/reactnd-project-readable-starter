import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  VOTE_POST,
  UPDATE_SORTING,
  POST_FORM,
  ADD_POST,
  ADD_COMMENT,
  LOAD_COMMENTS,
  CONTROL_NEW_POST_FORM
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
        let currentPosts = []
        posts.forEach( (post) => {
          currentPosts = {
            ...currentPosts,
            [post.id]: post
          }
        })
        return currentPosts
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
    case ADD_POST:
        const { title, username, message, category, id, timestamp } = action
        return {
              ...state,
              newPost: {
                author: username,
                  body: message,
                  category,
                  deleted: false,
                  id,
                  timestamp,
                  title,
                  voteScore: 1
              }
            }
    default :
      return state
  }
}

function comments ( state = {}, action ) {
  switch (action.type) {
    case LOAD_COMMENTS :
      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments,
        }
    default :
      return state
  }
}

function sorting(state = 'score', action) {
  switch (action.type) {
    case UPDATE_SORTING:
      return action.method
    default :
      return state
  }
}

function newPostForm(state = {}, action) {
  switch (action.type) {
    case CONTROL_NEW_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  sorting,
  newPostForm

})
