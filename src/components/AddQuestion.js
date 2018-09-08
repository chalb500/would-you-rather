import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input, FormGroup } from 'reactstrap';
import { handleSaveQuestion, addQuestion } from '../actions/questions'
import { handleGetUsers, receiveUsers } from '../actions/users'

class AddQuestion extends Component {
  state= {
    optionOneText: '',
    optionTwoText: ''
  }
  handleOptionOneChange = (e) => {
    this.setState({
      optionOneText: e.target.value
    })
  }
  handleOptionTwoChange = (e) => {
    this.setState({
      optionTwoText: e.target.value
    })
  }
  handleSubmit = (e) => {

    const { authedUser, dispatch, history } = this.props
    const { optionOneText, optionTwoText } = this.state

    //Create the question object
    let newQuestion = {
      optionOneText: optionOneText, 
      optionTwoText: optionTwoText, 
      author: authedUser
    }

    //Save the question, get the new list of users, then redirect
    dispatch(handleSaveQuestion(newQuestion))
    .then((formattedQuestion) => { 
      dispatch(addQuestion(formattedQuestion))
      dispatch(handleGetUsers()).then((users) =>{
        dispatch(receiveUsers(users))
      })
      history.push('/')
    })
  }
  render() {
    const { authedUser } = this.props
    const { optionOneText, optionTwoText } = this.state

    return (
      <div>
        {authedUser
          ? <div className='question-options-container'>
            <div className='question-options-text'>Would you rather?</div>
            <Form className='question-options-form'>
              <FormGroup>
                <Input 
                  type='text'
                  onChange={this.handleOptionOneChange}
                  placeholder='Option 1' />
              </FormGroup>
              <FormGroup>
                <Input 
                  type='text'
                  onChange={this.handleOptionTwoChange} 
                  placeholder='Option 2'/>
              </FormGroup>
              <Button 
                className='btn'
                onClick={this.handleSubmit}
                disabled={optionOneText.length === 0 || optionTwoText.length === 0}>
                    Submit
              </Button>
            </Form>
          </div>
          : <Redirect to={{
            pathname: '/login',
            state: { previousUrl: `/add`}
           }} />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser }){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion)