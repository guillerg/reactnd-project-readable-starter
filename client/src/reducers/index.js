import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
} from '../actions'

function categories( state={}, action){
  switch (action.type) {
    case LOAD_CATEGORIES:

      return state
    default:
      return state
  }
}

function posts (state = {}, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case LOAD_POSTS :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }

    default :
      return state
  }
}

function comments (state = {}, action) {

  switch (action.type) {
    case LOAD_POSTS :
      return state

    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
