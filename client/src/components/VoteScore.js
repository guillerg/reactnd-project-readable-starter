import React, { Component } from 'react'
import { connect } from 'react-redux'
import { vote_post } from '../actions'
import * as api from '../util/api'

class VoteScore extends Component {
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
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    votePost: (Nvalue, value) => {
      api.votePost(ownProps.post.id, value)
      dispatch(vote_post(ownProps.post.id, Nvalue+value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
