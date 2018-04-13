import React from 'react'
import QuestionCard from './QuestionCard'
import Footer from './Footer.js'

const RandomQ = (props) => {
  const questions = props.questions
  const randomid = () => {
    let rindex = Math.floor(Math.random() * (questions.length));
    return rindex
  }

  const rindex = randomid()
  const question = questions[rindex]

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
      <Footer/>
    </div>
  )
}
export default RandomQ;
