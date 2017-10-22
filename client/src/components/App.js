import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategories, getAllPosts } from '../actions'
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
    let {categories, posts, history} = this.props

    return (

      <div className="app">
        <Switch>
          <Route exact path='/' render={ ({ match }) => (
            <RootView
              categories={categories}
              posts={posts}
              history={history} />
            )}/>
          <Route path='/category/:url' render={ ({ match }) => (
            <CategoryView
              categoryPath={match.params.url}
              categories={categories}
              posts={posts}
              history={history} />
          )}/>
          <Route path='/edit/:query' render={({ match }) => (
            <EditPost postId={match.params.query} history={history} />
          )}/>
          <Route path='/:category/:postId' render={ ({ match }) => (
            <PostDetailView
              categories={categories}
              postId={match.params.postId}
              history={history} />
            )}/>

           <Route exact path='/add' component={AddPost} />

          <Route path='*' component={NoMatch}/>
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
    getAllCategories: () => (
      dispatch(getAllCategories())
    ),
    getAllPosts: () =>(
      dispatch(getAllPosts())
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
