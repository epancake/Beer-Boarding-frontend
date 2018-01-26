import React, { Component } from 'react';
import QuestionCard from './questionCard.js'

const BrowseList = (props) => {
  const questions = props.questions.questions
  console.log(props.questions.questions)
     return questions.map((question) => {
   return <QuestionCard key={question.id} question={question} />
  })

}

export default BrowseList;
