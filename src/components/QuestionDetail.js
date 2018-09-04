import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import AnsweredQuestion from './AnsweredQuestion';
import UnansweredQuestion from './UnansweredQuestion';
import { Redirect } from 'react-router-dom'

class QuestionDetail extends Component {
  render() {

    const { id } = this.props.match.params
    const { questions, authedUser } = this.props

    //If the user is logged in, try to display their question
    if (authedUser) {
      //If the question is valid
      if (questions[id]) {
        //Display the answered question
        if (questions[id].optionOne.votes.includes(authedUser) || 
          questions[id].optionTwo.votes.includes(authedUser)) {
          return (
            <div>
              <AnsweredQuestion id={id} />
            </div>
          )
        }
        //Display the unanswered question
        else {
          return (
            <div>
              <UnansweredQuestion id={id} />
            </div>
          )
        }
      } 
      //If the question is not valid, communicate that information
      else {
        return (
          <div>
            <NotFound />
          </div>
        )
      }
    } 
    //If the user is not logged in, have them login and then come back here
    else {
      return <Redirect to={{
        pathname: '/login',
        state: { previousUrl: `/questions/${id}`}
      }} />
    }
  }
}

function mapStateToProps({ questions, users, authedUser }){
  return {
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionDetail)