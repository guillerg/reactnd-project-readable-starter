import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'
import PostDetail from './PostDetail'


class PostDetailView extends Component {

  componentWillMount() {
      this.props.loadComments();
  }

	render() {

    const {posts, comments, postId, history } = this.props

    const currentPost = posts ? posts.find((post) => (post.id === postId)) : false

    const postComments = (comments) ? comments[postId] : false

		return (
			<div>
          <PostDetail post={currentPost} comments={postComments} history={history} />
			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    posts: Object.keys(state.posts).map((key) => state.posts[key]),
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadComments: () =>
      api.getPostComments(ownProps.postId).then( (comments) => {
        dispatch(load_comments(ownProps.postId, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
