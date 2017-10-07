import React, { Component } from 'react'
import { connect } from 'react-redux'
import { vote_post } from '../actions'
import * as api from '../util/api'

class VotePost extends Component {
	render() {

		const { post, votePost } = this.props

		return (
			<div className="wrapper">
				<div>
					{post.voteScore}
				</div>
				<a className="button" onClick={() => votePost(post.voteScore,1)}>
					<i className="fa fa-thumbs-o-up"></i>
				</a>
				<a className="button" onClick={() => votePost(post.voteScore,-1)}>
					<i className="fa fa-thumbs-o-down"></i>
				</a>
			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    posts: Object.keys(state.posts)
      .map((key) => state.posts[key])
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    votePost: (Nvalue, value) => {
      api.votePost(ownProps.post.id, value)
      dispatch(vote_post(ownProps.post.id, Nvalue+value))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(VotePost)
