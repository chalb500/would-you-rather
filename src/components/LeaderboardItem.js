import React from 'react'

const LeaderboardItem = (props) => {
  return (
    <tr>
      <td><img src={props.avatarURL} className='hero-image' /></td>
      <td>{ props.name }</td>
      <td>{ props.questionsAsked }</td>
      <td>{ props.questionsAnswered }</td>
    </tr>
  )
}

export default LeaderboardItem