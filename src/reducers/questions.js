import { 
  RECEIVE_QUESTIONS, 
  ANSWER_QUESTION, 
  ADD_QUESTION 
} from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION : 
      const {qid, answer, authedUser} = action

      return {
        ...state,
        ...state[qid][answer].votes.push(authedUser)
      }
    case ADD_QUESTION :
      const { question } = action

      return {
          ...state,
          [question.id]: question
        }
    default :
      return state
  }
}