import React, { Component } from 'react';
import { 
  Navbar, 
  NavItem, 
  Nav,
  NavbarBrand } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavigationBar extends Component {
  handleLogout = (e) => {
    const { dispatch } = this.props
    //Unset the authorized user
    dispatch(setAuthedUser(null))
  }
  render() {

    const { authedUser } = this.props

    return (
      <div className='mx-auto'>
        <Navbar color="light" light expand="md">
          <NavbarBrand>{authedUser ? `Hello ${authedUser}` : 'Not logged in'}</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem className='nav-item'>
                <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>
              </NavItem>
              <NavItem className='nav-item'>
                <Link to='/add' style={{ textDecoration: 'none' }}>Add Question</Link>
              </NavItem>
              <NavItem className='nav-item'>
                <Link to='/leaderboard' style={{ textDecoration: 'none' }}>Leaderboard</Link>
              </NavItem>
              {authedUser &&
                <NavItem>
                  <Link to='/login' onClick={this.handleLogout} style={{ textDecoration: 'none' }}>Logout</Link>
                </NavItem>
              }
            </Nav>
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NavigationBar)