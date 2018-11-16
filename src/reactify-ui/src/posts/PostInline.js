import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostInline extends Component {
  render () {
    let {post} = this.props
    let {elClass} = this.props
    return (
      <div className={elClass}>
        <h1>
          <Link maintainScrollPosition={false} to={{
          pathname: `/posts/${post.slug}`,
          state: {fromDashboard: false}
          }}>
            {post.title}
          </Link>
        </h1>
        <p>
          {post.content}
        </p>
      </div>
    )
  }
}

export default PostInline
