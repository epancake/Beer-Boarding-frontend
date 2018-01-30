import React from 'react'
import QuestionCard from './QuestionCard'



const RandomQ = (props) => {
  const questions = props.questions

  const randomid = () => {
    var rid = Math.floor(Math.random() * (questions.length)+1);
    console.log('rid', rid)
    return rid
  }

  const rid = randomid()

  const singleQuestion = () => {
    return questions.filter((question) => question.id === rid)[0]
  }

  const question = singleQuestion()
  console.log('finalSingleQ', question)

  return <QuestionCard key={question.id} question={question} solvers={props.solvers} postName={props.postName}/>
}
export default RandomQ;
