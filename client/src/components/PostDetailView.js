import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load_comments, post_delete_modal_show, load_post_delete_modal } from '../actions'
import * as api from '../util/api'
import VotePost from './VotePost'
import DeletePost from './DeletePost'
import CommentView from './CommentView'
import { Link } from 'react-router-dom'
//import AddComment from './../comment/AddComment'

class PostDetailView extends Component {

  componentWillMount() {
      this.props.loadPostComments(this.props.postId);
  }

	render() {

    const {posts, comments, postId, history,showDeleteModal, deletePostModal,loadPostDeleteModal } = this.props

    const currentPost = posts ? posts.find((post) => (post.id === postId)) : false
    const postComments = comments ? comments[postId] : false


		return (
			<div>
          { currentPost &&
            <div className="container">
              <div className="column">
                <VotePost voteScore={currentPost.voteScore} post={currentPost}/>
              </div>
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
              <span className="notifcation is-danger is-outlined is-small button" onClick={() => {
                    loadPostDeleteModal(currentPost.id)
                    showDeleteModal(true)
                  }}>Delete
              </span>
              &nbsp;
              <Link to={'/edit/'+currentPost.id}
                className="notifcation is-info is-outlined is-small button">
                Edit
              </Link>

              { postComments &&
                <div>
                  <div>
                    comments: {comments.length}
                  </div>
                  {postComments.map( (comment, index) =>
                    <CommentView position={index} key={index} comment={comment} />
                  )}
                </div>
              }

            </div>
          }

          <DeletePost
          deletePostModal={deletePostModal}
          history={history}/>

			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    posts: Object.keys(state.posts).map((key) => state.posts[key]),
    comments: state.comments[props.postId],
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    showDeleteModal: (valor) => {
      dispatch(post_delete_modal_show(valor))
    },
    loadPostDeleteModal: (postId) => {
      dispatch(load_post_delete_modal(postId))
    },
    loadPostComments: () =>
      api.getPostComments(ownProps.postId).then( (comments) => {
        dispatch(load_comments(ownProps.postId, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
