import React from 'react'
import QuestionCard from './QuestionCard.js'

const BrowseList = (props) => {
  const questions = props.questions
  console.log(props.questionssolvers)

  if (questions.length < 1) {
    return <p>No data yet, one second please!!!</p>
  }

  return questions.map((question) => {
    return <QuestionCard key={question.id}
      question={question}
      solvers={props.solvers}
      questions_solvers={props.questions_solvers}
      onSolverSubmit={props.onSolverSubmit}
      postName={props.postName}
      addSolvedBy={props.addSolvedBy}
      onSubmitUpdate={props.onSubmitUpdate}/>
  })

}

export default BrowseList;
