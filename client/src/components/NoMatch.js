import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NoMatch extends Component {

  render() {

    return (
      <div className="list-books">
        <div className="title">
          <h1>404 - Oops nothing here</h1>
        </div>
        <Link className="search"  to="/">Back to main page</Link>
      </div>
    )
  }
}
