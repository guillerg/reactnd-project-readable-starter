const api = "http://localhost:5001"

const headers = {
    'Accept': 'application/json',
    'Authorization':'guillerg-readable'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    //.then(data => data.posts)

export const getCategoryPosts = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
      .then(res => res.json())
      .then(data => data.posts)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.comment)

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data.comment)
