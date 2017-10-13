export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT_CONTROL = 'ADD_COMMENT_CONTROL'
export const EDIT_COMMENT_FORM = 'EDIT_COMMENT_FORM'

export function load_comments (postId, comments) {
  return {
    type: LOAD_COMMENTS,
    postId,
    comments
  }
}

export function add_comment(postId, comment) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

export function add_comment_control(name, value) {
  return {
    type: ADD_COMMENT_CONTROL,
    name,
    value
  }
}

export function vote_comment(commentId, parentId, score) {
  return {
    type: VOTE_COMMENT,
    commentId,
    parentId,
    score
  }
}
export function edit_comment_form(name, value) {
  return {
    type: EDIT_COMMENT_FORM,
    name,
    value
  }
}

export function edit_comment(id, parentId,body, author) {
  return {
    type: EDIT_COMMENT,
    parentId,
    id,
    body,
    author
  }
}
