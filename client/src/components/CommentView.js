import React, { Component } from 'react'
import { connect } from 'react-redux'
import { edit_comment_form, edit_comment, load_comments} from '../actions'
import VoteComment from './VoteComment';
import * as api from '../util/api'

class CommentView extends Component {

  componentDidMount() {
    this.props.controlEditCommentForm('id', 0)
  }

  handleSubmit() {

    if (this.props.editCommentForm.commentAuthor &&
        this.props.editCommentForm.commentAuthor !== '' &
        this.props.editCommentForm.commentBody &&
        this.props.editCommentForm.commentBody !== '')
    {
      this.props.editComment(
      this.props.editCommentForm.id,
      this.props.editCommentForm.commentBody,
      this.props.editCommentForm.commentAuthor)
    } else {
      console.log('Comment form error')
    }
  }

  handleChange(event) {
    this.props.controlEditCommentForm(event.target.name, event.target.value)
  }

	render() {

    const { comment, editCommentForm, controlEditCommentForm } = this.props

		return (

      <section className="content">
        <div className="column">

          <div className="column" style={{maxWidth: '115px'}}>
            <VoteComment voteScore={comment.voteScore} comment={comment} />
          </div>
          <div className="column">
            { (editCommentForm.id !== comment.id) &&
            <div>
              <strong>{comment.author}</strong>
              &nbsp;
              <small>{comment.timestamp}</small>
              &nbsp;

              <span>



              </span>

              <br />
              <div className="content">
                {comment.body}
              </div>
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
                  onClick={() => {editCommentForm('id', 0)}}>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentView)
