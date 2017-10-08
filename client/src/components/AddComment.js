import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_comment_control, add_comment } from '../actions'
import * as api from '../util/api'


class AddComment extends Component {


  handleChange = (event) => {
    this.props.addCommentControl(event.target.name, event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.addCommentData.commentAuthor &&
        this.props.addCommentData.commentAuthor !== '' &&
        this.props.addCommentData.newComment &&
        this.props.addCommentData.newComment !== '')
    {
      this.props.addCommentData.id = '_'+ Math.random().toString(36).substr(2, 9)
      this.props.addCommentData.timestamp = Date.now()
      this.props.addComment(this.props.addCommentData)
      this.emptyInputField()
      this.props.addCommentControl('newComment', '')
    } else {
      console.log('Error creating comment')
    }
    event.preventDefault()
  }

  emptyInputField() {
    this.textInput.value = ''
  }


	render() {


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
    addCommentData: state.addCommentData,
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
