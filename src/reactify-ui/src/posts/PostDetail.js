import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostUpdate from './PostUpdate'

class PostDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
    	slug: null,
    	post: null
    }
  }

  loadPost (slug) {
    const endpoint = `/api/posts/${slug}`
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const thisComp = this
    const csrfToken = cookie.load('csrftoken')
    if (csrfToken !== undefined) {
    	lookupOptions['headers']['X-CSRFToken'] = csrfToken
    	lookupOptions['credentials'] = 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        console.log(response)
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          post: responseData
        })
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  componentDidMount () {
  	if (this.props.match) {
	    const {slug} = this.props.match.params
	    this.setState({
	      slug: slug
	    })
	   	this.loadPost(slug)
  	}
  }

  render () {
  	const {post} = this.state
    return (
      <p>
        {post !== null
          ? <div>
            <h1>{post.title}</h1>
            {post.slug}
            <p>
              <Link maintainScrollPosition={false} to={{
        	pathname: `/posts/`,
        	state: {fromDashboard: false}
              }}>
            All Posts
              </Link>
            </p>

            {post.owner === true ? <PostUpdate post={post} /> : ''}
          </div>
          : 'Post not found'
  		}
      </p>
    )
  }
}

export default PostDetail
