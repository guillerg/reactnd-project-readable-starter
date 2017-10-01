import React, { Component } from 'react'
import FormPost from './FormPost'
import { connect } from 'react-redux'

class EditPost extends Component {

  fieldsAreValid = () => {
    const form = this.props.newPostForm
    if (form.title && form.category && form.username && form.message) return true;
    return false;
  }

  handleChange = (event) => {
    this.props.controlNewPostForm(event.target.name, event.target.value)
  }

	render() {

    const {posts, postId, categories} = this.props
    const post = (posts.length > 0)? posts.find((post) => (post.id === postId)): false

		return (
      <div>
      { post &&
        <FormPost post={post} categories={categories} history={this.props.history} />
      }
      </div>
    )
	}
}

function mapStateToProps(state) {
  return {
    posts: Object.keys(state.posts).map((key) => state.posts[key]),
    categories: state.categories,
    newPostForm: state.newPostForm
  }
}

export default connect(mapStateToProps)(EditPost)
