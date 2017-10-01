import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add_post_form, add_post } from '../actions'
import * as api from '../util/api'

class AddPost extends Component {

  componentWillMount() {
    this.props.controlNewPostForm('showNotification', false)
    this.props.controlNewPostForm('title', '')
    this.props.controlNewPostForm('category', '')
    this.props.controlNewPostForm('username', '')
    this.props.controlNewPostForm('message', '')
    this.props.controlNewPostForm('category', 0)

  }


  handleSubmit = (event) => {
      event.preventDefault()
      if (this.fieldsAreValid()) {
        console.log('***********')
        console.log('READY TO SEND !!!!')
        console.log('***********')
        this.props.newPostForm.id = '_'+Math.random().toString(36).substr(2, 9)
        this.props.newPostForm.timestamp = Date.now()
        this.props.addNewPost(this.props.newPostForm)
      } else {
        console.error('THIS IS NO VALID FORM!!!!')
      }
      event.preventDefault()
  }

    fieldsAreValid = () => {
        const form = this.props.newPostForm
        if (form.title && form.category && form.username && form.message) return true;
        return false;
      }

      handleChange = (event) => {
        this.props.controlNewPostForm(event.target.name, event.target.value)
      }


	render() {

    const { categories } = this.props

		return (
		<div>
        <div className="container has-top-margin has-bottom-margin">
          <div className="columns">
            <div className="column is-half">

              <form onSubmit={this.handleSubmit}>
                <div className="title">
                  Add a new Post
                </div>

                <div className="field">
                  <label className="label">Post Title</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      onChange={(event) => this.handleChange(event)}
                      placeholder="Title"/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input {/*is-success*/}"
                      type="text"
                      name="username"
                      onChange={(event) => this.handleChange(event)}
                      placeholder="your username" />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <p className="usernameMessageError help is-success is-hidden">This username is not valid</p>
                </div>

                <div className="field">
                  <label className="label">Category</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="category"
                        onChange={(event) => this.handleChange(event)}>
                        <option value="0">Select category</option>
                        { categories && categories.map((category, index) =>
                          <option
                            key={index}
                            value={category.path}>
                              {category.name}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea
                      name="message"
                      onChange={(event) => this.handleChange(event)}
                      className="textarea"
                      placeholder="Your message" />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button is-primary">
                      <span className="icon"><i className="fa fa-paper-plane"></i></span>
                      &nbsp; &nbsp;
                      Submit
                    </button>
                  </div>
                  <div>
                    <a onClick={() => window.history.back()} className="button is-link">Cancel</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
		</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    addPostForm: state.addPostForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlNewPostForm: (name, value) =>
      dispatch(add_post_form(name, value)),
    addNewPost: (formValues) => {
      api.addPost(formValues).then(() => {
        dispatch(add_post(formValues))
        api.getAllPosts().then( (posts) => {
          ownProps.history.push('/')
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
