import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import QuestionList from './QuestionList'

class Home extends Component {
  state = {
    showUnanswered: true,
    answeredQuestions: this.getAnsweredQuestions(this.props.questions)[0],
    unansweredQuestions: this.getAnsweredQuestions(this.props.questions)[1]
  }
  handleToggleQuestionType(shouldShow, e) {
    this.setState({
      showUnanswered: shouldShow
    })
  }
  getAnsweredQuestions(questions) {
    const { authedUser } = this.props
    
    let answeredQuestions = []
    let unansweredQuestions = []

    //Sort the keys according to timestamp
    let sortedQuestionKeys = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    //Find the answered questions
    sortedQuestionKeys.forEach((key) => {
      if (questions[key].optionOne.votes.includes(authedUser) || questions[key].optionTwo.votes.includes(authedUser)) {
        answeredQuestions.push(questions[key]);
      } else {
        unansweredQuestions.push(questions[key]);
      }
    })

    return [answeredQuestions, unansweredQuestions]
  }
  render() {
    const {authedUser} = this.props
    const {showUnanswered, answeredQuestions, unansweredQuestions} = this.state
    
    return(
      <div>
        {authedUser
          ? <div className='center'>
              <Button 
                className='btn question-type-button'
                onClick={(e) => this.handleToggleQuestionType(true, e)}>
                  Show Unanswered Questions
              </Button>
              <div className='divider' />
              <Button 
                className='btn question-type-button'
                onClick={(e) => this.handleToggleQuestionType(false, e)}>
                  Show Answered Questions
              </Button>
              {showUnanswered
                 ? <div className='question-list-container'>
                    <h3>Unanswered Questions</h3>
                    <QuestionList questions={unansweredQuestions} />
                   </div>
                 : <div className='question-list-container'>
                    <h3>Answered Questions</h3>
                    <QuestionList questions={answeredQuestions} />
                   </div>
              }
            </div>
          : <Redirect to={{
              pathname: '/login',
              state: { previousUrl: `/`}
             }} />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }){
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Home)