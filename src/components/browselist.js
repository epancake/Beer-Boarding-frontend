import React, { Component } from 'react';
import QuestionCard from './QuestionCard.js'

const BrowseList = (props) => {
  const questions = props.questions
     return questions.map((question) => {
   return <QuestionCard key={question.id} question={question} solvers={props.solvers.solvers}/>
  })

}

export default BrowseList;
