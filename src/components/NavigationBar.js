import React, { Component } from 'react';
import { 
  Navbar, 
  NavItem, 
  Nav,
  NavbarBrand } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavigationBar extends Component {
  render() {

    const { authedUser } = this.props

    return (
      <div className='mx-auto'>
        <Navbar color="light" light expand="md">
          <NavbarBrand>{authedUser ? `Hello ${authedUser}` : 'Not logged in'}</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem className='nav-item'>
                <Link to='/'>Home</Link>
              </NavItem>
              <NavItem className='nav-item'>
                <Link to='/add'>Add Question</Link>
              </NavItem>
              <NavItem className='nav-item'>
                <Link to='/leaderboard'>Leaderboard</Link>
              </NavItem>
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