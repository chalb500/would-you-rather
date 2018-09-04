import React, { Component } from 'react'
import NavigationBar from './NavigationBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Table } from 'reactstrap'
import LeaderboardItem from './LeaderboardItem';

class Leaderboard extends Component {
  render() {
    const {authedUser, users, userIds} = this.props
    
    return (
      <div>
        {authedUser 
          ? <div>
            <NavigationBar />
            <Table>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th># Questions Asked</th>
                  <th># Questions Answered</th>
                </tr>
              </thead>
              <tbody>
                {
                  userIds.map((key) => (
                    <LeaderboardItem 
                      key={key} 
                      avatarURL={users[key].avatarURL} 
                      name={users[key].name}
                      questionsAsked={users[key].questions.length}
                      questionsAnswered={Object.keys(users[key].answers).length} />
                  ))
                }
              </tbody>
            </Table>
          </div>
          : <Redirect to={{
            pathname: '/login',
            state: { previousUrl: `/leaderboard`}
           }} />
        }
      </div>
    )
  }
}

function sortUsers(users) {
  return Object.keys(users).sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) 
    - ((Object.keys(users[a].answers).length) + users[a].questions.length)) 
}

function mapStateToProps({ authedUser, users }){
  return {
    authedUser,
    users,
    userIds: sortUsers(users)
  }
}

export default connect(mapStateToProps)(Leaderboard)