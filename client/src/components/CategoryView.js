import React, { Component } from 'react';

export default class CategoryView extends Component {

  filterCategory = (categories) => {
      if (categories)
        return {
          data: categories.find((category) => (category.path === this.props.categoryPath)),
          index: categories.findIndex((category) => (category.path === this.props.categoryPath)) }
      else return null
    }

  render() {

    const { categories } = this.props
    const category = this.filterCategory(categories)

      return (
        <div>
         { category && (
           <section className='hero is-primary'>
             <div className="hero-body">
               <div className="container">
                 <h1 className="title">
                   {category && category.data.name}
                 </h1>
                 <h2 className="subtitle">
                   Hero subtitle
                 </h2>
               </div>
             </div>
           </section>
         )}

        <section>
         <div className="container">
           <h2 className="is-size-3"> THE CATEGORY: </h2>
          </div>
         </section>
        </div>
      )
  }

}
