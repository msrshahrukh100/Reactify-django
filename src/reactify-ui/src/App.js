import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Posts from './posts/Posts'
import PostDetail from './posts/PostDetail'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/posts/' component={Posts} />
          <Route exact path='/posts/:slug' component={PostDetail} />
          <Route component={Posts} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
