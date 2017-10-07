import React, { Component } from 'react'
import { connect } from 'react-redux'
import { post_delete_modal_show, delete_post } from '../actions'
import * as api from '../util/api'
import Modal from 'react-modal'

class DeletePost extends Component {

	render() {

    const { showDeleteModal, deletePost, deletePostModal } = this.props

		return (
        <Modal
          isOpen={deletePostModal.isActive}
          onRequestClose={() => showDeleteModal(false)}
        >
          <div className="container">
            <h1 className="title">
              Please confirm
            </h1>
            <br />
            <div className="button" onClick={() => showDeleteModal(false)}>Cancel</div>
            <div className="button is-outlined is-danger"
                onClick={() => {
                  deletePost(deletePostModal.postId)
                  showDeleteModal(false)
                }} >
              Delete
            </div>
          </div>
        </Modal>
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
    deletePost: (postDelete) => {
      api.deletePost(postDelete).then(() => dispatch(delete_post(postDelete)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletePost)
