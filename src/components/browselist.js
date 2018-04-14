import React from 'react'
import QuestionCard from './QuestionCard.js'

const BrowseList = (props) => {

  if (!props.questions) {
    return <p>No data yet, one second please!!!</p>
  } else if (props.questions) {
    props.questions.sort(function (a, b) {return a.id - b.id;})
  }

  return (
    props.questions.map((question) => {
      return (
        <div>
        <QuestionCard key={question.id}
          question={question}
          solvers={props.solvers}
          questions_solvers={props.questions_solvers}
          onSolverSubmit={props.onSolverSubmit}
          postName={props.postName}
          addSolvedBy={props.addSolvedBy}
          onSubmitUpdate={props.onSubmitUpdate}/>
        </div>
      )
    })
  )
}

export default BrowseList;
