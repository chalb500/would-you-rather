import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnsweredQuestion extends Component {
  state={
    hideOptionOne: true
  }
  componentDidMount() {
    const { id, questions, authedUser } = this.props

    if (questions[id].optionOne.votes.includes(authedUser)){
      this.setState({
        hideOptionOne: false
      })
    }
  }
  totalNumberOfVotes(number) {
    const { id, questions } = this.props
    
    if (number === 1) {
      return questions[id].optionOne.votes.length;
    } else if (number === 2) {
      return questions[id].optionTwo.votes.length;
    }

    return 0;
  }
  totalPercentageOfVotes(number) {
    const { id, questions } = this.props
    
    return (
      (this.totalNumberOfVotes(number) / 
        (questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)) * 100
    )
  }
  render() {
    const { id, questions, users } = this.props
    const { hideOptionOne } = this.state
    return (
      <div>
        <div>
          { users[questions[id].author].avatarURL} 
        </div>
        <div>
          Would you rather:
          <div>
            <h5>{questions[id].optionOne.text}</h5>
            <div>{`Total number of votes: ${this.totalNumberOfVotes(1)}`}</div>
            <div>{`Total percentage of votes: ${this.totalPercentageOfVotes(1)}%`}</div>
            <div hidden={hideOptionOne}>You selected this option</div>
          </div>
            <h5>{questions[id].optionTwo.text}</h5>
            <div>{`Total number of votes: ${this.totalNumberOfVotes(2)}`}</div>
            <div>{`Total percentage of votes: ${this.totalPercentageOfVotes(2)}%`}</div>
            <div hidden={!hideOptionOne}>You selected this option</div>
          <div>
          </div>
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

export default connect(mapStateToProps)(AnsweredQuestion)