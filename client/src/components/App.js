import React, { Component } from 'react';
import * as api from '../util/api'
import { connect } from 'react-redux'
import { load_categories, load_posts } from '../actions'
import { Switch, Route } from 'react-router-dom'
import RootView from './RootView'
import CategoryView from './CategoryView'
import CreateEditView from './CreateEditView'
import PostDetailView from './PostDetailView'
import NoMatch from './NoMatch'

class App extends Component {

  state = {}

  componentWillMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }


  render() {
    console.log('props', this.props)

    const { posts, categories } = this.props

    return (
      <div id="wrapper">

        <div className="container">
            <h3 className="title is-2">
              <span className="icon is-medium">
                <i className="fa fa-list"></i>
              </span>
              Categories
            </h3>

            <div className="container">
              <div className="columns">
                <div className="column">
                  <p className="notification is-info">First column</p>
                </div>
                <div className="column">
                  <p className="notification is-success">Second column</p>
                </div>
                <div className="column">
                  <p className="notification is-warning">Third column</p>
                </div>
                <div className="column">
                  <p className="notification is-danger">Fourth column</p>
                </div>
              </div>
            </div>
          </div>

      <div>
        <section class="section">
      					<div className="container">
      						<h2 className="is-size-3"> categories </h2>
      						{ categories && categories.map( (category, index) =>


      							<div key={index}>
      								{category.name}
      							</div>
      						) }
      					</div>
      					<div className="container">
      						<h2 className="is-size-3"> posts: </h2>
      						{ posts && posts.map( (post, index) =>
      							<div key={index}>
      								«<b>{post.title}</b>» by {post.author}
      							</div>
      						) }
      					</div>
      				</section>
      			</div>
</div>

//      <div className="app">
//        <Switch>
//          <Route exact path='/' component={RootView}/>
//          <Route exact path='/posts/:id' component={CategoryView} />
//          <Route exact path='/create/post' component={PostDetailView} />
//          <Route exact path='/posts/:id/create_comment' component={CreateEditView} />
//          <Route component={NoMatch}/>
//        </Switch>
//      </div>
        )
  }
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () =>
    	api.getAllCategories().then( (categories) => {
    		dispatch(load_categories(categories))
    	}
   	),
    getAllPosts: () =>
      api.getAllPosts().then( (posts) => {
        dispatch(load_posts(posts))
      }
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
