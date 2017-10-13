import React, { Component } from 'react';
import PostList from './PostList'
import Menu from './Menu'

export default class RootView extends Component {

  render() {

    const { posts, categories } = this.props

      return (

        <div id="wrapper">
              <Menu categories={categories} posts={posts}/>

        <div className="box" style={{marginTop:'2em'}}>
          <PostList posts={posts}/>
        </div>

      </div>
      )
  }

}
