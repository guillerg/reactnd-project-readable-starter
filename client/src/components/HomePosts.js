import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import VoteScore  from './VoteScore'
import * as api from '../util/api'

class PostInList extends Component {

  componentWillMount() {
      this.props.loadComments(this.props.postId);
  }

	render() {

    const { post,comments } = this.props

    let postComments = false
        if (comments) {
          postComments = comments[post.id]
        }


		return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="has-text-centered">
              <VoteScore post={post} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
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
                { postComments ?
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
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadComments: () =>
      api.getPostComments(ownProps.post.id).then( (comments) => {
        dispatch(load_comments(ownProps.post.id, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostInList)
