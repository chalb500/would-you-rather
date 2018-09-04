import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser, 
    qid, 
    answer
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveAnswer(authedUser, qid, answer) {
  return (dispatch, getState) => {
    return _saveQuestionAnswer({
      authedUser, 
      qid, 
      answer
    }).then(dispatch(answerQuestion(authedUser, qid, answer)))
  }
}

export function handleSaveQuestion(question) {
  return (dispatch, getState) => {
    return _saveQuestion(question)
  }
}