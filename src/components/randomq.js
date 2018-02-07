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

  return <QuestionCard key={question.id} question={question} solvers={props.solvers} postName={props.postName}/>
}
export default RandomQ;
