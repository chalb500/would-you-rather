import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input, Label, FormGroup, Alert } from 'reactstrap';

class Login extends Component {
  state = {
    text: '',
    loggedIn: false,
    errorHidden: true
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  handleLogin = (e) => {
    e.preventDefault()
    const {users, dispatch} = this.props
    const {text} = this.state

    if (!Object.keys(users).includes(text)) {
      this.setState({
        errorHidden: false,
        text: ''
      })
    } else {
      const id = users[text].id;
      
      dispatch(setAuthedUser(id))
      
      this.setState({
        errorHidden: true,
        text: '',
        loggedIn: true
      })
    }
  }
  render() {
    const { errorHidden, loggedIn } = this.state

    //In the event the user navigates directly to the login page
    if (loggedIn && !this.props.location.state){
      return <Redirect to='/' />
    } 
    //Take the user back to where they were
    else if (loggedIn) {
      return <Redirect to={this.props.location.state.previousUrl} />
    } 

    return (
      <div>
          <Form>
            <div className='row login-box'>
              <div className='mx-auto col-4'>
                <FormGroup>
                <Label 
                    htmlFor='username' 
                    className='label'>Username:</Label>
                <Input 
                    id='username' 
                    type='text' 
                    className='text'
                    onChange={this.handleChange} />
                </FormGroup>
                <Alert 
                  hidden={errorHidden}
                  color='danger'>
                  *Username not found
                </Alert>
                <Button 
                  className='btn'
                  onClick={this.handleLogin}>
                    Login
                </Button>
              </div>
            </div>
          </Form>
      </div>
    )
  }
}

function mapStateToProps({ users }){
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)