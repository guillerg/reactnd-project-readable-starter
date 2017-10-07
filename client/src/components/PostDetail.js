import React, { Component } from 'react'
import { connect } from 'react-redux'
import { post_delete_modal_show, load_post_delete_modal } from '../actions'
import * as api from '../util/api'
import VotePost from './VotePost'
import DeletePost from './DeletePost'
import CommentView from './CommentView'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

class PostDetail extends Component {

	render() {

    const {post, comments, history,
			showDeleteModal, deletePostModal,loadPostDeleteModal } = this.props

		return (
			<div>
          { post &&
            <div className="container">
              <h1>
                {post.title}
              </h1>
              <p>
                {post.body}
              </p>
              <p>
                posted by <strong>{post.author}</strong>,
                &nbsp;
                {post.timestamp}
                <br />
                category: <Link to={'/category/' + post.category}>{post.category}</Link>
              </p>
              <div className="column">
                <VotePost voteScore={post.voteScore} post={post}/>
              </div>
              <span className="is-outlined is-small button" onClick={() => {
                    loadPostDeleteModal(post.id)
                    showDeleteModal(true)
                  }}>Delete
              </span>
              &nbsp;
              <Link to={'/edit/'+post.id}
                className="is-info is-outlined is-small button">
                Edit
              </Link>
	
              { comments && comments.length > 0 &&
                <div className='box'>
                  <div>
                    comments: {comments.length}
                  </div>
                  {comments.map( (comment, index) =>
                    <CommentView position={index} key={index} comment={comment} />
                  )}
                </div>
              }
             <AddComment postId={post.id} />
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
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
