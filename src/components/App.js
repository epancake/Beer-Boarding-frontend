import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from 'react-modal';
import './App.css';
import Header from './Header.js'
import BrowseList from './Browselist.js'
import RandomQ from './Randomq.js'
import Form from './Form.js'

class App extends Component {
  state = {
    questions: [],
    solvers: [],
    questions_solvers: []
  }

  componentDidMount() {
    Modal.setAppElement('.App');
    fetch('http://localhost:3000/questions')
      .then(response => response.json())
      .then(data => {
        this.setState({questions: data.questions});
        console.log('questions0', this.state.questions)
      });
    fetch('http://localhost:3000/solvers')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({solvers: data});
      });
{/*     fetch('http://localhost:3000/questions_solvers')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({questions_solvers: data[0]});
      });
      */}
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

  addSolver = (solver) => {
  var url = 'http://localhost:3000/solvers';
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(solver),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
  }

  addQuestionSolver = (question) => {
  var url = 'http://localhost:3000/questions_solvers';
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

  onSolverSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const solvers = this.state.solvers.solvers
    console.log('solvers', solvers)
    const solver = ({
      id: this.state.solvers.solvers.length + 1,
      solver_name: data.get('sname'),
    })
    solvers.push(solver)
    this.addSolver(solver)
    this.setState({ solvers })
    window.location.assign('http://localhost:3001')
  }

  onQuestionSolverSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const questions_solvers = this.state.questions_solvers
    console.log('questions_solvers', questions_solvers)
    const question_solver = ({
      id: this.state.questions.questions.length + 1,
      question_id: data.get('qname'),
      solver_id: data.get('qtext'),
    })
    questions_solvers.push(question_solver)
    this.addQuestion(question_solver)
    this.setState({ questions_solvers })
    window.location.assign('http://localhost:3001')
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Router >
          <div>
            <Link to="/browselist">
              <button>Browse Questions</button>
            </Link>
            <Link to="/random">
              <button>Random Question</button>
            </Link>
            <Link to="/add">
              <button>Add a Question</button>
            </Link>
            <div>
              <Route path="/browselist" render={()=><BrowseList solvers={this.state.solvers}
                questions={this.state.questions}
                onDelete={this.onDelete}
                onQuestionSolverSubmit={this.onQuestionSolverSubmit}/>} />
              <Route path="/random" render={()=><RandomQ questions={this.state.questions}/>} />
              <Route path="/add" render={()=><Form questions={this.state.questions} onSubmit={this.onSubmit}/>} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
