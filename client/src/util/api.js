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

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const votePost = (postId, value) => {
        const score = (value === 1) ? 'upVote' : 'downVote'
        console.log(postId)
        console.log(score)
        return fetch(`${api}/posts/${postId}`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ score })
        }).then(res => res)

}

export const voteComment = (commentId, value) => {

  const score = (value === 1) ? 'upVote' : 'downVote'
  console.log(score)
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score })
  }).then(res => res)
}

export const addPost = (post) => {

  const body = {
    id: post.id,
    title: post.title,
    category: post.category,
    author: post.username,
    body: post.message,
    timestamp: post.timestamp,
    voteScore: 1,
    deleted: false
  }

  return fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

}

export const editComment = (commentId, body, author) => {

  const comment = {
    body,
    author
  }

  return fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

}

export const editPost= (postId, post) => {

  const body = {
    title: post.title,
    category: post.category,
    author: post.author,
    body: post.body
  }

  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res)

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
      method: 'DELETE',
      headers: headers
    }).then(res => res)

export const addComment = (postId, comment) => {
  const body = {
    body: comment.newComment,
    voteScore: 1,
    id: comment.id,
    parentId: postId,
    author: comment.commentAuthor,
    timestamp: comment.timestamp
  }
  return fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => {
    return res
  })
}
