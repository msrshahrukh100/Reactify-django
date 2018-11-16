import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostInline from './PostInline'
import PostCreate from './PostCreate'

class Posts extends Component {
  constructor (props) {
    super(props)
    this.toggleDivClass = this.toggleDivClass.bind(this)
    this.newPostCreated = this.newPostCreated.bind(this)
    this.state = {
      posts: [],
      elClass: 'card'
    }
  }

  loadPosts () {
    const endpoint = '/api/posts'
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const thisComp = this

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        console.log(response)
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          posts: responseData
        })
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  componentDidMount () {
    this.setState({
      posts: []
    })
    this.loadPosts()
  }

  toggleDivClass (event) {
    event.preventDefault()
    let elClass = this.state.elClass
    if (elClass === '') {
      this.setState({
        elClass: 'card'
      })
    } else {
      this.setState({
        elClass: ''
      })
    }
  }

  newPostCreated (data) {
    let currentPosts = this.state.posts
    currentPosts.unshift(data)
    this.setState({
      posts: currentPosts
    })
  }

  render () {
    let {posts} = this.state
    let {elClass} = this.state
    const csrfToken = cookie.load('csrftoken')
    return (
      <div>
        <button onClick={this.toggleDivClass}>Toggle Class</button>
        <h1>
          Hello Shahrukh
        </h1>
        {posts.length > 0
          ? posts.map((postItem, index) => {
            return (
              <PostInline post={postItem} elClass={elClass} />
            )
          })

          : 'No posts for you'}
        {(csrfToken !== null && csrfToken !== undefined)
          ? <div className='my-5'>
            <PostCreate onNewPostCreated={this.newPostCreated} />
          </div>
          : ''
        }
      </div>
    )
  }
}

export default Posts
