import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostList from './PostList'

export default class RootView extends Component {

  render() {

    const { posts, categories } = this.props

      return (

        <div id="wrapper">
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
            <div>
    					<Link to="/add">
                <span className="icon"><i className="fa fa-plus-square"></i></span>
                &nbsp; New post
              </Link>
            </div>

        <div className="box" style={{marginTop:'2em'}}>
          <PostList posts={posts}/>
        </div>

      </div>
      )
  }

}
