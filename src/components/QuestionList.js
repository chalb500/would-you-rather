import React from 'react';
import { Link } from 'react-router-dom'

const QuestionList = (props) => {
  return (
    <ul className='question-list'>
      {
        props.questions.map((question) => (
          <Link key={question.id} to={`/questions/${question.id}`} style={{ textDecoration: 'none' }}>
            <li>
              {`${question.optionOne.text} or ${question.optionTwo.text}`}
            </li>
          </Link>
        ))
      }
    </ul>
  )
}

export default QuestionList