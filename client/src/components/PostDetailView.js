import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'
import { Link } from 'react-router-dom'

class Post extends Component {

  componentWillMount() {
      this.props.loadPostComments(this.props.postId);
  }

	render() {

    const {posts, comments, postId} = this.props

    let post = posts.find((post) => (post.id === postId))
    let postComments = comments[postId]

		return (
			<div>
          { post &&
            <div className="container content" style={{marginTop: '25px', marginBottom: '50px'}}>

              <h1>
                {post.title}
              </h1>
              <blockquote>
                {post.body}
              </blockquote>
              <p>
                posted by <strong>{post.author}</strong>,
                &nbsp;
                {post.timestamp}
                <br />
                category: <Link to={'category/' + post.category}>{post.category}</Link>
              </p>

              { postComments &&
                <div>
                  {postComments.map( (comment, index) =>
                    <p key={index}>

                      <div className="box">
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{comment.author}</strong> <small>{comment.timestamp}</small>
                                <br />
                                {comment.body}
                              </p>
                            </div>
                            <nav className="level is-mobile">
                              <div className="level-left">
                                <a className="level-item">
                                  <span className="icon is-small"><i className="fa fa-edit"></i></span>
                                </a>
                                <a className="level-item">
                                  <span className="icon is-small"><i className="fa fa-trash-o"></i></span>
                                </a>
                              </div>
                            </nav>
                          </div>
                      </div>

                    </p>
                  )}
                </div>
              }

            </div>
          }
			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    posts: state.posts.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPostComments: () =>
      api.getPostComments(ownProps.postId).then( (comments) => {
        dispatch(load_comments(ownProps.postId, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
