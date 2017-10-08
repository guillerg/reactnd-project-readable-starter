import React, { Component } from 'react'
import { connect } from 'react-redux'
import { edit_comment, load_comments, edit_comment_form} from '../actions'
import VoteComment from './VoteComment';
import * as api from '../util/api'
import * as helper from '../util/helper'

class CommentView extends Component {

  componentDidMount() {
    this.props.controlEditCommentForm('id', 0)
  }

  handleSubmit() {

    if (this.props.editCommentForm.commentAuthor &&
        this.props.editCommentForm.commentAuthor !== '' &&
        this.props.editCommentForm.commentBody &&
        this.props.editCommentForm.commentBody !== '')
    {
      this.props.editComment(
      this.props.editCommentForm.id,
      this.props.editCommentForm.commentBody,
      this.props.editCommentForm.commentAuthor)
    } else {
      console.log('Comment edit form error')
    }
  }

  handleChange(event) {
    this.props.controlEditCommentForm(event.target.name, event.target.value)
  }

	render() {

    const { comment, editCommentForm, controlEditCommentForm } = this.props
    const { deleteComment, startEditingThisComment } = this.props

		return (

      <section className="content">
        <div className="column">

          <div className="column">
            { (editCommentForm.id !== comment.id) &&
            <div>
              <div className="content">
                {comment.body}
              </div>

              <strong>{comment.author}</strong>
              &nbsp;
              <small>{helper.timeConverter(comment.timestamp)}</small>
              &nbsp;
              <div className="column" style={{maxWidth: '115px'}}>
                <VoteComment voteScore={comment.voteScore} comment={comment} />
              </div>
              <span>

                <div onClick={deleteComment} className="button is-small is-danger is-outlined">
                          delete
                </div>
                        &nbsp;
                <div onClick={startEditingThisComment} className="button is-small is-info is-outlined">
                          edit
                </div>

              </span>
            </div>
            }

            { (editCommentForm.id === comment.id) &&
              <div className="editCommentArea">
                <input type="text"
                  className="input"
                  name="commentAuthor"
                  defaultValue={comment.author}
                  onChange={(event) => this.handleChange(event)} />
                <textarea
                  className="textarea has-bottom-margin"
                  name="commentBody"
                  defaultValue={comment.body}
                  onChange={(event) => this.handleChange(event)} />
                <div className="button is-success is-small"
                  onClick={() => this.handleSubmit()}>
                  Update
                </div>
                &nbsp;
                <div
                  className="button is-small"
                  onClick={() => {controlEditCommentForm('id', 0)}}>
                  Cancel
                </div>
              </div>
            }
          </div>
        </div>
      </section>
		)
	}
}

function mapStateToProps(state) {
  return {
    editCommentForm: state.editCommentForm
  }
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlEditCommentForm: (name, value) => {
      dispatch(edit_comment_form(name, value))
    },
    editComment: (commentId, body, author) => {
      api.editComment(commentId, body, author)
        .then(() => {
          dispatch(edit_comment(commentId,
            ownProps.comment.parentId,
            body,
            author))
          dispatch(edit_comment_form('id', 0))
        }
        )
    },
    deleteComment: () => {
      api.deleteComment(ownProps.comment.id).then(() => {
        api.getPostComments(ownProps.comment.parentId).then( (comments) => {
          dispatch(load_comments(ownProps.comment.parentId, comments))
        })
      })
    },
    startEditingThisComment: () => {
      dispatch(edit_comment_form('id', ownProps.comment.id))
      dispatch(edit_comment_form('commentAuthor', ownProps.comment.author))
      dispatch(edit_comment_form('commentBody', ownProps.comment.body))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentView)
