export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST = 'LOAD_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPDATE_SORTING = 'UPDATE_SORTING'
export const POST_FORM = 'POST_FORM'
export const VOTE_POST = 'VOTE_POST'

export function vote_post(postId, score){
  return{
    type:VOTE_POST,
    postId,
    score
  }
}

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
export function load_post(post) {
  return {
    type: LOAD_POST,
    post
  }
}
export function add_post (post) {
  return {
    type: ADD_POST,
    title: post.title,
    category: post.category,
    username: post.username,
    message: post.message
  }
}
export function update_sorting(method) {
  return {
    type: UPDATE_SORTING,
    method
  }
}

export function post_form(name, value) {
  return {
    type: POST_FORM,
    name,
    value
  }
}

export function edit_post ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}
export function delete_post ({ id, deleted }) {
  return {
    type: DELETE_POST,
    id,
    deleted
  }
}
export function upvote_post ({ id, voteScore }) {
  return {
    type: UPVOTE_POST,
    id,
    voteScore
  }
}
export function downvote_post ({ id, voteScore }) {
  return {
    type: DOWNVOTE_POST,
    id,
    voteScore
  }
}
export function load_comments (postId, comments) {
  return {
    type: LOAD_COMMENTS,
    postId,
    comments
  }
}
export function edit_comment ({ id, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}
export function delete_comment ({ id, deleted, parentDeleted }) {
  return {
    type: DELETE_COMMENT,
    id,
    deleted,
    parentDeleted
  }
}
export function upvote_comment ({ id, voteScore }) {
  return {
    type: UPVOTE_COMMENT,
    id,
    voteScore
  }
}
export function downvote_comment ({ id, voteScore }) {
  return {
    type: DOWNVOTE_COMMENT,
    id,
    voteScore
  }
}
