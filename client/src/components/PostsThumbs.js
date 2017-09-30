import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'
import VoteScore from './VoteScore'


class PostsThumbs extends Component {

  componentWillMount() {
      this.props.load_comments(this.props.postId);
  }

	render() {

    const { post, comments } = this.props

    let postComments = false
    if (comments) {
      postComments = comments[post.id]
    }

		return (
      <div >
        <article className="media">
          <div>
            <figure className="has-text-centered">
              <VoteScore postId={post.id} />
            </figure>
          </div>
          <div >
            <div >
              <p>
                <strong>
                  {post.author}
                </strong>
                &nbsp;
                <small>
                {post.timestamp}
                </small>
                <br />
                <Link to={'/post/'+post.id} className="is-size-5">{post.title}</Link>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <Link to={'/category/'+post.category} className="tag">
                  {post.category}
                </Link>
                &nbsp;
                <span className="icon is-small">
                  <i className="fa fa-comment-o"></i>
                </span>
                &nbsp;
                { postComments && postComments.length ?
                  ((postComments.length === 1) ?
                      '1 comment'
                      : postComments.length + ' comments')
                  : ' 0 comments'
                }
              </div>
            </nav>
          </div>
        </article>
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
    load_comments: () =>
      api.getPostComments(ownProps.post.id).then( (comments) => {
        dispatch(load_comments(ownProps.post.id, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsThumbs)
