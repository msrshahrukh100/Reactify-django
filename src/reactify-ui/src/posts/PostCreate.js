import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'

class PostCreate extends Component {
  constructor (props) {
  	super(props)
  	this.handleFormSubmit = this.handleFormSubmit.bind(this)
  	this.handleInputChange = this.handleInputChange.bind(this)
  	this.handleDraftChange = this.handleDraftChange.bind(this)
  	this.state = {
  		title: null,
  		content: null,
  		draft: false,
  		publish: null
  	}
  }

  createPost (data) {
    const endpoint = 'api/posts/'
    const csrfToken = cookie.load('csrftoken')
    const thiscomp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'

      }

      fetch(endpoint, lookupOptions)
        .then(function (response) {
          console.log(response)
          return response.json()
        }).then(function (responseData) {
          console.log(responseData)
          thiscomp.props.onNewPostCreated(responseData)
          thiscomp.clearForm()
        }).catch(function (error) {
          console.log('error', error)
        })
    }
  }

  // if we need to call this clearForm from a rendered Component we need to
  // 	bind it with this
  clearForm () {
  	this.formElement.reset()
  	console.log('current state is ', this.state)
  }

  handleFormSubmit (event) {
  	event.preventDefault()
  	const data = this.state
  	this.createPost(data)
  }

  handleInputChange (event) {
  	event.preventDefault()
  	let key = event.target.name
  	let value = event.target.value
  	this.setState({
  		[key]: value
  	})
  }

  handleDraftChange (event) {
  	this.setState({
  		draft: !this.state.draft
  	})
  }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit} ref={(el) => this.formElement = el}>
        <div className='form-group'>
          <label for='title'>Post title</label>
          <input type='text' id='title' name='title' className='form-control' placeholder='Blog post title' required='required' onChange={this.handleInputChange} />
        </div>
        <div className='form-group'>
          <label for='content'>Content</label>
          <textarea id='content' name='content' className='form-control' placeholder='Post content' required='required' onChange={this.handleInputChange} />

        </div>
        <div className='form-group'>
          <label for='draft'>
            <input type='checkbox' id='draft' checked={this.state.draft} name='draft' className='mr-2' onChange={this.handleDraftChange} />
                     Draft </label>
        </div>
        <div className='form-group'>
          <label for='publish'>Publish Date</label>
          <input type='date' id='publish' name='publish' className='form-control' required='required' onChange={this.handleInputChange} />
        </div>
        <button className='btn btn-primary'>Save</button>
      </form>
    )
  }
}

export default PostCreate
