import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'

class VoteComment extends Component {

	render() {

		const { comment, voteComment } = this.props

		return (
			<div>
				<div>
					{comment.voteScore}
				</div>
				<a className="button is-success is-outlined" onClick={() => voteComment(comment.voteScore, 1)}>
					<i className="fa fa-thumbs-o-up"></i>
				</a>
				<a className="button is-danger is-outlined" onClick={() => voteComment(comment.voteScore, -1)}>
					<i className="fa fa-thumbs-o-down"></i>
				</a>
			</div>
		)
	}
}


function mapStateToProps(state, props) {
  return {
    posts: Object.keys(state.posts).map((key) => state.posts[key])
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    voteComment: (newValue, value) => {
      api.voteComment(ownProps.comment.id, value).then(() => {
        api.getPostComments(ownProps.comment.parentId).then( (comments) => {
          dispatch(load_comments(ownProps.comment.parentId, comments))
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteComment)
