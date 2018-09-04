import React, { Component } from 'react';
import Home from './Home'
import Login from './Login'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import _ from 'lodash'
import { BrowserRouter, Route } from 'react-router-dom'
import QuestionDetail from './QuestionDetail'
import NotFound from './NotFound'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'

//TODO: Add routes for answered, unanswered

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          {
            this.props.loading === true
            ? null
            : <div>
                <h1 className='text-center page-title'>Would you rather?</h1>
                <Route path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/questions/:id' component={QuestionDetail} />
                <Route path='/notfound' component={NotFound} />
                <Route path='/add' component={AddQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
          }
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({users}){
  return {
    loading: _.isEmpty(users)
  }
}

export default connect(mapStateToProps)(App);
