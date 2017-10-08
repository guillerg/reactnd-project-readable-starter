import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_comments, post_delete_modal_show, load_post_delete_modal } from '../actions'
import * as api from '../util/api'
import VotePost from './VotePost'
import DeletePost from './DeletePost'
import * as helper from '../util/helper'


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
          <div>
            <div>
              <p>
                <Link to={'/'+post.category+'/'+post.id}>
                  {post.title}
                </Link>
                <br />
                <strong>
                  {post.author}
                </strong>
                &nbsp;
                <small>
                {helper.timeConverter(post.timestamp)}
                </small>

              </p>
            </div>
              <div >
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
          <div>
              <VotePost post={post} />
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
              &nbsp;&nbsp;
            <Link to={'/edit/'+post.id}
              className="button  is-small is-info is-outlined">
                        <span className="icon is-small"><i className="fa fa-edit"></i></span>
                        &nbsp;
                        edit
            </Link>
                      </div>
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
