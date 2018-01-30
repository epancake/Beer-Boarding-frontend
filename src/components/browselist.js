import React from 'react'
import QuestionCard from './QuestionCard.js'

const BrowseList = (props) => {
  const questions = props.questions

  if (questions.length < 1) {
    return <p>no data yet</p>
  }

  return questions.map((question) => {
    return <QuestionCard key={question.id} question={question} solvers={props.solvers} postName={props.postName}/>
  })

}

export default BrowseList;
