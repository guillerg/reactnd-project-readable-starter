import {
  LOAD_COMMENTS,
  ADD_COMMENT,
  ADD_COMMENT_CONTROL,
  VOTE_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENT_FORM
} from '../actions'

export const comments = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS :

      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }

    case VOTE_COMMENT :

      const {commentId, score } = action
      let newState = state;
      newState[action.parentId].map((comment) => {
        if (comment.id === commentId)
          comment.voteScore = score
        return comment
      })
      return newState

    case ADD_COMMENT :

      const { comment } = action
      const parentId = action.postId

      const newComment = {
        author: comment.commentAuthor,
        body: comment.newComment,
        deleted: false,
        id: comment.id,
        parentDeleted: false,
        parentId: parentId,
        timestamp: comment.timestamp,
        voteScore: 1
      }

      return {
        ...state,
        [parentId]: state[parentId].concat(newComment)
      }
    case EDIT_COMMENT:

    return {
      ...state,
      [action.parentId]: state[action.parentId].map(
           (content) => content.id === action.id ? {...content, body: action.body, author: action.author}
                                   : content
       )
    }

    default :
      return state
  }
}

export const newCommentData = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_CONTROL:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

export const editCommentForm = (state = {id: 0}, action) => {
  switch (action.type) {
    case EDIT_COMMENT_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}
