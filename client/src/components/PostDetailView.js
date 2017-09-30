import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load_comments } from '../actions'
import * as api from '../util/api'
import VoteScore from './VoteScore'
import { Link } from 'react-router-dom'

class Post extends Component {

  componentWillMount() {
      this.props.loadPostComments(this.props.postId);
  }

	render() {

    const {posts, comments, postId} = this.props
    const currentPost = posts ? posts.find((post) => (post.id === postId)) : false
    const postComments = comments ? comments[postId] : false


		return (
			<div>
          { currentPost &&
            <div className="container content" style={{marginTop: '25px', marginBottom: '50px'}}>

              <h1>
                {currentPost.title}
              </h1>
              <p>
                {currentPost.body}
              </p>
              <p>
                posted by <strong>{currentPost.author}</strong>,
                &nbsp;
                {currentPost.timestamp}
                <br />
                category: <Link to={'/category/' + currentPost.category}>{currentPost.category}</Link>
              </p>

              { postComments &&
                <div>
                  {postComments.map( (comment, index) =>
                    <p key={index}>
                      <div className="box">
                          <div>
                            <div >
                              <p>
                                <strong>{comment.author}</strong> <small>{comment.timestamp}</small>
                                <br />
                                {comment.body}
                              </p>
                            </div>
                              <div>
                                <a>
                                  <span><i className="fa fa-edit"></i></span>
                                </a>
                                <a>
                                  <span><i className="fa fa-trash-o"></i></span>
                                </a>
                              </div>
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
    posts: Object.keys(state.posts).map((key) => state.posts[key]),
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
