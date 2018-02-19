import React from 'react'
import QuestionCard from './QuestionCard'



const RandomQ = (props) => {
  const questions = props.questions
  console.log('quesitions', questions)
  const randomid = () => {
    var rindex = Math.floor(Math.random() * (questions.length));
    console.log('riindexd', rindex)
    return rindex
  }

  const rindex = randomid()

  const question = questions[rindex]
  console.log('finalSingleQ', question)

  return <QuestionCard key={question.id + question.name}
    question={question}
    solvers={props.solvers}
    questions_solvers={props.questions_solvers}
    onSolverSubmit={props.onSolverSubmit}
    postName={props.postName}
    addSolvedBy={props.addSolvedBy}
    onSubmitUpdate={props.onSubmitUpdate}/>
}
export default RandomQ;
