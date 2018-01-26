import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import { BrowserRouter } from 'react-router-dom'
import BrowseList from './browselist.js'
import RandomQ from './randomq.js'
import Form from './form.js'
import { Link } from 'react-router-dom'
import { browserHistory, Router, Route } from 'react-router'
import Modal from 'react-modal';

// Modal.setAppElement('.App');

class App extends Component {
  state = {questions: []}

  componentDidMount() {
    Modal.setAppElement('.App');
    fetch('http://localhost:3000/questions')
      .then(response => response.json())
      .then(data => {
        this.setState({questions: data})
      })
  }

  addQuestion = (question) => {
  var url = 'http://localhost:3000/questions';
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(question),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
  }

  onSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const questions = this.state.questions.questions
    console.log('questions', questions)
    const question = ({
      id: this.state.questions.questions.length + 1,
      question_name: data.get('qname'),
      question: data.get('qtext'),
      solution: data.get('solution'),
      submitter: data.get('submitter')
    })
    questions.push(question)
    this.addQuestion(question)
    this.setState({ questions })
    window.location.assign('http://localhost:3001')
  }


  render() {
    return (
      <div className="App">
        <Header />
        <nav>
          <Link to="/browselist">
            <button>Browse Questions</button>
          </Link>
          <Link to="/random">
            <button>Random Question</button>
          </Link>
          <Link to="/add">
            <button>Add a Question</button>
          </Link>
        </nav>
        <div>
          <Route path="/browselist" render={()=><BrowseList questions={this.state.questions} onDelete={this.onDelete}/>} />
          <Route path="/random" render={()=><RandomQ questions={this.state.questions}/>} />
          <Route path="/add" render={()=><Form questions={this.state.questions} onSubmit={this.onSubmit}/>} />
        </div>
      </div>
    );
  }
}

export default App;
