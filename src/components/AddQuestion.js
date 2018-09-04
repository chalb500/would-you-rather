import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Button, Form, Input, Label, FormGroup } from 'reactstrap';
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
          ? <div>
            <NavigationBar />
            <div>Would you rather?</div>
            <Form>
              <FormGroup>
                <Label>Option 1:</Label>
                <Input 
                  type='text'
                  onChange={this.handleOptionOneChange}/>
              </FormGroup>
              <FormGroup>
                <Label>Option 2:</Label>
                <Input 
                  type='text'
                  onChange={this.handleOptionTwoChange}/>
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