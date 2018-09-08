import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'
import Switch from '@material-ui/core/Switch';

class Home extends Component {
  state = {
    checked: true,
    answeredQuestions: this.getAnsweredQuestions(this.props.questions)[0],
    unansweredQuestions: this.getAnsweredQuestions(this.props.questions)[1]
  }
  hangleToggle = (e) => {
    this.setState({
      checked: e.target.checked
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
    const {answeredQuestions, unansweredQuestions, checked} = this.state
    
    return(
      <div >
        {authedUser
          ? <div>
              <Switch 
                onChange={this.hangleToggle}
                checked={this.state.checked}
                color='primary' /> 
                Show Unanswered
              {checked
                 ? <div className='question-list-container center'>
                    <h3>Unanswered Questions</h3>
                    <QuestionList questions={unansweredQuestions} />
                   </div>
                 : <div className='question-list-container center'>
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