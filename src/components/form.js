import React, { Component } from 'react';
import Footer from './Footer.js'

const baseUrl = 'https://beerboardapi.herokuapp.com/'

class Form extends Component {

  constructor(props) {
  super(props);

    this.state = {
      question_name: "",
      question: "",
      solution: "",
      submitter: ""
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const question = ({
      id: this.props.getId(this.props.questions),
      question_name: this.state.question_name,
      question: this.state.question,
      solution: this.state.solution,
      submitter: this.state.submitter,
    })
    this.addQuestion(question)
  }

  addQuestion = (question) => {
    console.log("q", question)
  let url = baseUrl + 'questions';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(question),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .then(res => {window.location.href='./success'; return res})
  .then(data =>{
      this.setState({questions: data})
      })
  .catch(error => console.error('Error:', error))
  }

  handleInputChange1 = (e) => {
  this.setState({question_name: e.target.value});
  }

  handleInputChange2 = (e) => {
    this.setState({question: e.target.value});
  }

  handleInputChange3 = (e) => {
    this.setState({solution: e.target.value});
  }

  handleInputChange4 = (e) => {
    this.setState({submitter: e.target.value});
  }

  render(){
    return  (
      <div>
      <form className='addform' id='form' onSubmit={this.onSubmit}>
        <label className='add qname-label' htmlFor="qname">Question Name:</label>
        <input className='add qname-field' type="text" name="qname" onInput={this.handleInputChange1}></input>
        <label className='add qtext-label' htmlFor="qtext" >Question:</label>
        <textarea className='add qtext-field' name="qtext" cols="30" rows="5" onInput={this.handleInputChange2}></textarea>
        <label className='add sname-label' htmlFor="solution">Solution:</label>
        <textarea className='add sname-text' name="solution" cols="30" rows="5" onInput={this.handleInputChange3}></textarea>
        <label className='add subm-label' htmlFor="submitter">Your First and Last Name:</label>
        <input className='add subm-text' type="text" name="submitter" onInput={this.handleInputChange4}></input>
        <input className='add addqbutn' type="submit" value="Submit"/>
      </form>
      <Footer/>
      </div>
    )
  }
}

export default Form
