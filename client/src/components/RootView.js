import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostDetailView from './PostDetailView'
import PostList from './PostList'

export default class RootView extends Component {

  render() {

    const { posts, categories } = this.props

      return (
        <div id="wrapper">
          <div className="container">
            <h3 className="title is-3 is-spaced">Categories</h3>
            <div className="container">
              <div className="columns">
                { categories && categories.map( (category, index) => {
                   const postCount = posts.filter( (post) => (post.category === category.path)).length;
                   return (
                     <Link to={'/category/'+category.path} key={index} className="column">
                     <p>
                       <span className="subtitle">{category.name}</span>
                       <br/>
                       { postCount + ' posts' }
                     </p>
                   </Link>
                   )
                }
              ) }
            </div>
          </div>
        </div>

        <section>
        <div className="wrapper" style={{marginTop:'2em'}}>
          <PostList posts={posts}/>
        </div>
      </section>


      </div>
      )
  }

}
