import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import { handleGetUsers, receiveUsers } from '../actions/users'

class UnansweredQuestion extends Component {
  handleVote(optionNumber, id) {
    const {dispatch, authedUser} = this.props

    dispatch(handleSaveAnswer(authedUser, id, optionNumber))
    .then(
      dispatch(handleGetUsers()).then((users) =>{
        dispatch(receiveUsers(users))
      })
    )
  }
  render() {

    const { id, questions, users } = this.props

    return (
      <div>
        <div>
          <img 
            src={users[questions[id].author].avatarURL}
            className='question-hero-image'
            alt='avatar' />
        </div>
        <div className='center'>
          Would you rather:
        </div>
        <div className='center'>
          <Button 
            color='secondary' 
            onClick={() => this.handleVote('optionOne', id)}>
            {questions[id].optionOne.text}
          </Button>
          <div className='divider' />
          <Button 
            color='secondary'
            onClick={() => this.handleVote('optionTwo', id)}>
            {questions[id].optionTwo.text}
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }){
  return {
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(UnansweredQuestion)