export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST = 'LOAD_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'


export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const UPDATE_SORTING = 'UPDATE_SORTING'

export const EDIT_POST_FORM = 'EDIT_POST_FORM'
export const ADD_POST_FORM = 'ADD_POST_FORM'
export const POST_DELETE_MODAL = 'DELETE_MODAL'

export const SET_POST_ID_TO_DELETE_MODAL = 'SET_POST_ID_TO_DELETE_MODAL'
export const CONTROL_NEW_COMMENT = 'CONTROL_NEW_COMMENT'



export function load_categories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function load_posts(posts) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function load_comments (postId, comments) {
  return {
    type: LOAD_COMMENTS,
    postId,
    comments
  }
}

export function vote_post(postId, score){
  return{
    type:VOTE_POST,
    postId,
    score
  }
}

export function update_sorting(method) {
  return {
    type: UPDATE_SORTING,
    method
  }
}

export function add_post_form(name, value) {
  return {
    type: ADD_POST_FORM,
    name,
    value
  }
}

export function edit_post_form(name, value) {
  return {
    type: EDIT_POST_FORM,
    name,
    value
  }
}

export function add_post(post){
  return {
    type: ADD_POST,
    title: post.title,
    category: post.category,
    username: post.username,
    message: post.message,
    id: post.id,
    timestamp: post.timestamp
  }
}

export function post_delete_modal(bool) {
  return {
    type: POST_DELETE_MODAL,
    active: bool
  }
}

export function setPostIdToDeleteModal(postId) {
  return {
    type: SET_POST_ID_TO_DELETE_MODAL,
    postId
  }
}

export function delete_post (id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function edit_post(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function add_comment(postId, comment) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

export function controlNewCommentData(name, value) {
  return {
    type: CONTROL_NEW_COMMENT,
    name,
    value
  }
}

export function vote_comment(commentId, parentId, newValue) {
  return {
    type: VOTE_COMMENT,
    commentId,
    parentId,
    newValue
  }
}
