import React, { Component } from 'react'
import { connect } from 'react-redux'
import { vote_post } from '../actions'
import * as api from '../util/api'

class VoteScore extends Component {
	render() {

		const { post, voteScore } = this.props

		return (
			<div className="wrapper">
				<div className=''>
					{post.voteScore}
				</div>
				<a className="button" onClick={() => vote_post(post.voteScore,1)}>
					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
				</a>
				<a className="button" onClick={() => vote_post(post.voteScore,-1)}>
					<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
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
    votePost: (Nvalue, diff) => {
      api.votePost(ownProps.post.id, diff).then(() =>
        dispatch(vote_post(ownProps.post.id, Nvalue+diff))
			)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
