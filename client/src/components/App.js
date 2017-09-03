import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import RootView from './RootView'
import CategoryView from './CategoryView'
import CreateEditView from './CreateEditView'
import PostDetailView from './PostDetailView'
import NoMatch from './NoMatch'

class App extends Component {

  render() {
    console.log('props', this.props)
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={RootView}/>
          <Route exact path='/posts/:id' component={CategoryView} />
          <Route exact path='/create/post' component={PostDetailView} />
          <Route exact path='/posts/:id/create_comment' component={CreateEditView} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
        )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments
  }
}

export default App;
