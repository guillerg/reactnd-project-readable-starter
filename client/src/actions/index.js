export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const POSTS_SORT = 'POSTS_SORT'
export const ADD_POST_FORM = 'ADD_POST_FORM'
export const POST_DELETE_MODAL_SHOW = 'POST_DELETE_MODAL_SHOW'
export const LOAD_POST_DELETE_MODAL = 'LOAD_POST_DELETE_MODAL'
export const EDIT_POST_FORM = 'EDIT_POST_FORM'



export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT_CONTROL = 'ADD_COMMENT_CONTROL'
export const EDIT_COMMENT_FORM = 'EDIT_COMMENT_FORM'


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

export function vote_post(postId, score){
  return{
    type:VOTE_POST,
    postId,
    score
  }
}

export function posts_sort(method) {
  return {
    type: POSTS_SORT,
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

export function post_delete_modal_show(bool) {
  return {
    type: POST_DELETE_MODAL_SHOW,
    active: bool
  }
}

export function load_post_delete_modal(postId) {
  return {
    type: LOAD_POST_DELETE_MODAL,
    postId
  }
}

export function delete_post (postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function edit_post(post) {
  return {
    type: EDIT_POST,
    post
  }
}




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
