import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class RootView extends Component {

  render() {

    const {categories } = this.props



      return (

        <div id="menu">
              <nav className="navbar" aria-label="main navigation">
                <div className="navbar-brand">
                  <Link to='/' className="navbar-item">HOME</Link >
                { categories && categories.map( (category, index) => {
                   return (
                       <Link to={'/category/'+category.path} key={index} className="navbar-item">
                         <span className="subtitle">{category.name}</span>
                     </Link>
                   )
                }
              ) }

            </div>
            </nav>
            <div>
    					<Link to="/add">
                <span className="icon"><i className="fa fa-plus-square"></i></span>
                &nbsp; New post
              </Link>
            </div>

      </div>
      )
  }

}
