import React, { Component } from 'react';
import HomePosts from './HomePosts'

export default class CategoryView extends Component {

  filterCategory = (categories) => {
      if (categories)
        return {
          data: categories.find((category) => (category.path === this.props.categoryPath)),
          index: categories.findIndex((category) => (category.path === this.props.categoryPath)) }
      else return null
    }

  render() {

    const { categories, posts } = this.props
    const category = this.filterCategory(categories)
    const categoryPosts = posts.filter( (post) => (post.category === category.data.name))

      return (
        <div>
         { category && (
           <div style={{marginBottom: '50px'}}>
              <section className=''>
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title">
                      {category.data.name}
                    </h1>
                    <h2 className="subtitle">
                      Only posts about {category.data.name}
                    </h2>
                  </div>
                </div>
              </section>
              <HomePosts posts={categoryPosts} />
            </div>
          )
        }
      </div>
      )
    }
}
