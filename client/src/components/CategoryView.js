import React, { Component } from 'react';
import PostList from './PostList'
import Menu from './Menu'

export default class CategoryView extends Component {

  filterCategory = (categories) => {
      if (categories)
        return {
          data: categories.find((category) => (category.path === this.props.categoryPath))
        }
      else return null
    }

  render() {

    const { categories, posts } = this.props
    const category = this.filterCategory(categories)
    const categoryPosts = posts.filter((post) => (post.category === category.data.name))

      return (
        <div>
          <Menu categories={categories}/>
         { category && (
           <div >
                <div>
                  <div className="title">
                    <h1 >
                      Category : {category.data.name}
                    </h1>
                    <br />
                  </div>
                </div>
              <PostList posts={categoryPosts}/>
            </div>
          )
        }
      </div>
      )
    }
}
