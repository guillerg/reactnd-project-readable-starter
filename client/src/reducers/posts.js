import {
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  ADD_POST_FORM,
  EDIT_POST_FORM,
  POST_DELETE_MODAL_SHOW,
  LOAD_POST_DELETE_MODAL
} from '../actions'

export const posts = (state = {}, action) => {
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

    case ADD_POST:
        const { title, username, message, category, id, timestamp } = action

        return {
          ...state,
          [id]: {
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

    case DELETE_POST :
      const postDelete = action.postId
      return {
        ...state,
        [postDelete]: {
          ...state[postDelete],
          deleted: true
        }
      }

    case EDIT_POST:
      const postEdit = action.post
      return {
        ...state,
        [postEdit.id]: {
          ...state[postEdit.id],
          title: postEdit.title,
          body: postEdit.body,
          author: postEdit.author,
          category: postEdit.category
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

    default :
      return state
  }
}

export const addPostForm = (state = {}, action) => {
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

export const deletePostModal = (state = false, action) => {
  switch (action.type) {
    case POST_DELETE_MODAL_SHOW:
      const { active } = action
      return {
        ...state,
        isActive: active
      }
    case LOAD_POST_DELETE_MODAL:
      const { postId } = action
      return {
        ...state,
        postId
      }
    default :
      return state
  }
}

export const editPostForm = (state = {}, action) => {
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
