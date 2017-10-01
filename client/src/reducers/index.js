import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  VOTE_POST,
  DELETE_POST,
  EDIT_POST,
  UPDATE_SORTING,
  ADD_POST,
  ADD_COMMENT,
  LOAD_COMMENTS,
  ADD_POST_FORM,
  EDIT_POST_FORM,
  DELETE_MODAL,
  VOTE_COMMENT,
  POST_DELETE_MODAL,
  SET_COMMENTS_TO_POST_ID,
  SET_POST_ID_TO_DELETE_MODAL,
  CONTROL_NEW_COMMENT
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

function comments (state = {}, action) {
  switch (action.type) {
    case LOAD_COMMENTS :

      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }

    case VOTE_COMMENT :

      const {commentId, newValue } = action
      let newState = state;
      newState[action.parentId].map((comment) => {
        if (comment.id === commentId)
          comment.voteScore = newValue
        return comment
      })
      return newState

    case ADD_COMMENT :

      const { comment } = action
      const parentId = action.postId
      return {
        ...state,
        [parentId]: state[parentId].concat({
          author: comment.commentAuthor,
          body: comment.newComment,
          deleted: false,
          id: comment.id,
          parentDeleted: false,
          parentId,
          timestamp: comment.timestamp,
          voteScore: 1
        })
      }

    default :
      return state
  }
}

function posts ( state = {}, action ) {
  switch (action.type) {

    case DELETE_POST :
          const removeId = action.postId
          return {
            ...state,
            [removeId]: {
              ...state[removeId],
              deleted: true
            },
          }
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
    case EDIT_POST:
        const postToEdit = action.post
        return {
          ...state,
          [postToEdit.id]: {
            ...state[postToEdit.id],
            title: postToEdit.title,
            body: postToEdit.body,
            author: postToEdit.author,
            category: postToEdit.category
            }
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

function sorting(state = 'score', action) {
  switch (action.type) {
    case UPDATE_SORTING:
      return action.method
    default :
      return state
  }
}

function addPostForm(state = {}, action) {
  switch (action.type) {
    case ADD_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

function deletePostModal(state = false, action) {
  switch (action.type) {
    case POST_DELETE_MODAL:
      const { active } = action
      return {
        ...state,
        isActive: active
      }
    case SET_POST_ID_TO_DELETE_MODAL:
      const { postId } = action
      return {
        ...state,
        postId
      }
    default :
      return state
  }
}

function editPostForm(state = {}, action) {
  switch (action.type) {
    case EDIT_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

function newCommentData(state = {}, action) {
  switch (action.type) {
    case CONTROL_NEW_COMMENT:
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
  addPostForm,
  editPostForm,
  deletePostModal,
  newCommentData
})
