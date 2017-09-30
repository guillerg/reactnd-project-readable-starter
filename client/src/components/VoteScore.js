import React, { Component } from 'react'
import { connect } from 'react-redux'
import { vote_post } from '../actions'
import * as api from '../util/api'

class Vote extends Component {
	render() {

		const { postId, posts, vote_post } = this.props

		const currentPost = (posts) ? posts.find((post) => (post.id === postId)) : ''

		return (
			<div className="wrapper">
				<div>
					{currentPost.voteScore}
				</div>
				<a className="button" onClick={() => vote_post(currentPost.voteScore,1)}>
					<i className="fa fa-thumbs-o-up"></i>
				</a>
				<a className="button" onClick={() => vote_post(currentPost.voteScore,-1)}>
					<i className="fa fa-thumbs-o-down"></i>
				</a>
			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    posts: Object.keys(state.posts).map((key => state.posts[key]))
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    vote_post: (Nvalue, diff) => {
      api.votePost(ownProps.postId, diff)
      dispatch(vote_post(ownProps.postId, Nvalue+diff))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
