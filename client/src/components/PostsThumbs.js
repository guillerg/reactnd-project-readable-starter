import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_comments, post_delete_modal_show, load_post_delete_modal } from '../actions'
import * as api from '../util/api'
import VotePost from './VotePost'
import DeletePost from './DeletePost'


class PostsThumbs extends Component {

  componentWillMount() {
      this.props.loadComments();
  }

	render() {

    const { post, comments,  deletePostModal, showDeleteModal,
      loadPostDeleteModal,history} = this.props

    const postComments = (comments) ? comments[post.id] : false

		return (
      <div className="box">
          <div className="media-left">
              <VotePost post={post} />
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
                <Link to={'/'+post.category+'/'+post.id}>
                  {post.title}
                </Link>
              </p>
            </div>
              <div className="level-left">
                <Link to={'/category/'+post.category}>
                  {post.category}
                </Link>
                &nbsp;
                <span className="icon">
                  <i className="fa fa-comment-o"></i>
                </span>
                &nbsp;
                Comments: {(postComments && postComments.length)? postComments.length:0}
              </div>
          </div>
          <div className="column">
            <div className="button is-small is-outlined"
              onClick={() => {
                loadPostDeleteModal(post.id)
                showDeleteModal(true)
              }}>
              <span className="icon is-small"><i className="fa is-danger fa-trash-o"></i></span>
                &nbsp;
                delete
              </div>
          </div>
          <br />
            <Link to={'/edit/'+post.id}
              className="button  is-small is-info is-outlined">
                        <span className="icon is-small"><i className="fa fa-edit"></i></span>
                        &nbsp;
                        edit
            </Link>
            <DeletePost deletePostModal={deletePostModal} history={history} />
      </div>

		)
	}
}

function mapStateToProps(state, props) {
  return {
    comments: state.comments,
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadComments: () =>
      api.getPostComments(ownProps.post.id).then( (comments) => {
        dispatch(load_comments(ownProps.post.id, comments))
      }
    ),
    showDeleteModal: (bool) => {
          dispatch(post_delete_modal_show(bool))
    },
    loadPostDeleteModal: (postId) => {
          dispatch(load_post_delete_modal(postId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsThumbs)
