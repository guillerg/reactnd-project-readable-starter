import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostDetailView from './PostDetailView'
import HomePosts from './HomePosts'

export default class RootView extends Component {

  render() {

    const { posts, categories } = this.props

      return (
        <div id="wrapper">
          <div className="container">
            <h3 className="title is-3 is-spaced">Categories</h3>
            <div className="container">
              <div className="columns">
                { categories && categories.map( (category, index) =>
                <Link to={'/category/'+category.path} key={index} className="column">
                  <p className=''>
                    <span className="subtitle">{category.name}</span>
                  </p>
                </Link>
              ) }
            </div>
          </div>
        </div>

        <section>
        <div className="container" style={{marginTop:'2em'}}>
          { posts && posts.map( (post, index) =>
            <HomePosts key={index} post={post} />
          ) }
        </div>
      </section>


      </div>
      )
  }

}
