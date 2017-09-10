import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'

class PostInList extends Component {

  componentWillMount() {
      this.props.loadComments(this.props.postId);
  }

	render() {

    const { post, comments } = this.props

		return (
      <div className="box">
        <article className="media">
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
                { comments ?
                  ((comments.length === 1) ?
                      '1 comment'
                      : comments.length + ' comments')
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
    postsInfo: state.posts.posts,
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
