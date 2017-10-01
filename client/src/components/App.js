import React, { Component } from 'react';
import { connect } from 'react-redux'
import { load_categories, load_posts } from '../actions'
import * as api from '../util/api'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import RootView from './RootView'
import CategoryView from './CategoryView'
import PostDetailView from './PostDetailView'
import NoMatch from './NoMatch'
import AddPost from './AddPost'
import EditPost from './EditPost'

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  render() {

    const { history, categories, posts } = this.props

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={ ({ match }) => (
            <RootView
              categories={this.props.categories}
              posts={this.props.posts}
              history={history} />
            )}/>
          <Route path='/category/:url' render={ ({ match }) => (
            <CategoryView
              categoryPath={match.params.url}
              categories={this.props.categories}
              posts={this.props.posts}
              history={history} />
          )}/>
          <Route path='/edit/:query' render={({ match }) => (
            <EditPost postId={match.params.query} history={history} />
          )}/>
          <Route path='/:category/:postId' render={ ({ match }) => (
            <PostDetailView
              postId={match.params.postId}
              categoryUrl={match.params.category}
              history={history} />
            )}/>
          <Route path='/post/:query' render={({ match }) => (
            <PostDetailView postId={match.params.query} history={history} />
          )}/>
           <Route exact path='/add' component={AddPost} />

          <Route component={NoMatch}/>
        </Switch>
      </div>
        )
  }
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories,
    posts: Object.keys(state.posts)
      .map((key) => state.posts[key])
      .filter((post) => (post.deleted === false))
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
