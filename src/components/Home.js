import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'
import Switch from '@material-ui/core/Switch';

class Home extends Component {
  state = {
    checked: true
  }
  hangleToggle = (e) => {
    this.setState({
      checked: e.target.checked
    })
  }
  getAnsweredQuestions(questions) {
    const { authedUser } = this.props

    //Sort the keys according to timestamp
    let sortedQuestionKeys = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    //Determine the answered and unanswered questions
    return sortedQuestionKeys.reduce((acc, key) => {
      const question = questions[key]
      if(this.hasAnswered(question, authedUser)) {
        acc["answered"] = acc["answered"].concat([ question ])
      } else {
        acc["unanswered"] = acc["unanswered"].concat([ question ])
      }

      return acc
    }, {answered: [], unanswered: []})
  }
  hasAnswered = (question, authedUser) => {
    const { votes: votes1 } = question.optionOne
    const { votes: votes2 } = question.optionTwo 
    return votes1.includes(authedUser) || votes2.includes(authedUser)
  }
  render() {
    const { authedUser, questions } = this.props
    const { checked } = this.state
    const { answered, unanswered } = this.getAnsweredQuestions(questions)

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
                    <QuestionList questions={unanswered} />
                   </div>
                 : <div className='question-list-container center'>
                    <h3>Answered Questions</h3>
                    <QuestionList questions={answered} />
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