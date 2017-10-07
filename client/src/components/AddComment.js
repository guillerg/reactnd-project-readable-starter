import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_comment_control, add_comment } from '../actions'
import * as api from '../util/api'


class AddComment extends Component {

  emptyInputField() {
    this.textInput.value = ''
  }

  handleChange = (event) => {
    this.props.addCommentControl(event.target.name, event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.newCommentData.commentAuthor &&
        this.props.newCommentData.commentAuthor !== '' &&
        this.props.newCommentData.newComment &&
        this.props.newCommentData.newComment != '')
    {
      this.props.newCommentData.id = '_'+ Math.random().toString(36).substr(2, 9)
      this.props.newCommentData.timestamp = Date.now()
      this.props.addComment(this.props.newCommentData)
      this.emptyInputField()
      this.props.addCommentControl('newComment', '')
    } else {
      console.log('Error creating comment')
    }
    event.preventDefault()
  }



	render() {

    const { newCommentData, addCommentControl } = this.props
		return (
      <div className="wrapper">
        <h4>
          Add comment:
        </h4>
        <input className="input"
          type="text"
          name="commentAuthor"
          placeholder="Username"
          onChange={(event) => this.handleChange(event)} />
        <textarea
          className="textarea"
          ref={element => this.textInput = element}
          type="text"
          name="newComment"
          placeholder="Text goes here..."
          onChange={(event) => this.handleChange(event)} />
        <div className="button" onClick={this.handleSubmit}>Add Comment</div>
      </div>
		)
	}

}

function mapStateToProps(state) {
  return {
    newCommentData: state.newCommentData,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addCommentControl: (name, value) =>
      dispatch(add_comment_control(name, value)),
    addComment: (commentData) => {
      api.addComment(ownProps.postId, commentData).then(() => {
        api.getPostComments(ownProps.postId).then( (comments) => {
          dispatch(add_comment(ownProps.postId, commentData))
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
