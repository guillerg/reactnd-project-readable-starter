import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update_sorting, load_comments } from '../actions'
import { Link } from 'react-router-dom'
import PostsThumbs from './PostsThumbs'
import * as api from '../util/api'
import VoteScore from './VoteScore'

class PostList extends Component {


	render() {

const { posts, sortMethod, update_sorting } = this.props

		const sortByScore = (a, b) => {
			(a.voteScore > b.voteScore)
				return -1;
			if (a.voteScore < b.voteScore)
				return 1;
			return 0;
		}

	 const sortByDate = (a, b) => {
			if (a.timestamp > b.timestamp)
				return -1;
			if (a.timestamp < b.timestamp)
				return 1;
			return 0;
	}

    (sortMethod === 'date') ?
			posts.sort(sortByDate):
      posts.sort(sortByScore)

    return (
      <div className="container">
									Sort By &nbsp;
        <div className="select right">
          <select value={sortMethod}
            onChange={ (event) => { update_sorting(event.target.value) } }>
            <option value="score">Top Score</option>
            <option value="date">Most recent</option>
          </select>
        </div>

        <h3>
          Number of posts: {posts.length}
        </h3>

        <div>
					{ posts && posts.length && posts.map( (post, index) =>
            <PostsThumbs key={index} post={post} />
          ) }
        </div>

        <div className="container has-top-margin">
          <Link className="button" to="/new">
            Add post
          </Link>
        </div>

      </div>
    )
	}
}

function mapStateToProps(state, props) {
  return {
    sortMethod: state.sortMethod
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update_sorting: (newSortMethod) => {
      dispatch(update_sorting(newSortMethod))
    },
		load_comments: () =>
      api.getPostComments(ownProps.post.id).then( (comments) => {
        dispatch(load_comments(ownProps.post.id, comments))
      }
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
