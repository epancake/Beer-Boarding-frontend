import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from 'react-modal';
import './App.css';
import Header from './Header.js'
import BrowseList from './Browselist.js'
import RandomQ from './Randomq.js'
import Form from './Form.js'
import PeopleGraph from './Graphs.js'

var baseUrl = 'http://beerboardapi.herokuapp.com/'
var homeUrl = 'http://localhost:3000'

class App extends Component {
  state = {
    questions: [],
    solvers: [],
    questions_solvers: []
  }

  componentDidMount() {
    Modal.setAppElement('.App');
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          questions: data.questions,
          solvers: data.solvers,
          questions_solvers: data.questions_solvers});
        console.log('questions', this.state.questions)
        console.log('solvers', this.state.solvers)
        console.log('questions_solvers', this.state.questions_solvers)
      });
  }

  addQuestion = (question) => {
  var url = baseUrl + 'questions';
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(question),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response))
  .then(data =>{
      this.setState({questions: data});
    })
  }



  postName = (event) => {
    event.preventDefault()
    console.log('postname')
    const form = event.target
    const data = new FormData(form);
    const solvers = this.state.solvers
    console.log(solvers)
    const solver = ({
      id: this.state.solvers.length + 20,
      solver_name: data.get('newsolver'),
    })
    solvers.push(solver)
    this.addSolver(solver)
  }

  addSolver = (solver) => {
  var url = baseUrl + 'solvers';
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(solver),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response))
  .then(data =>{
      this.setState({solvers: data})});
  }

  addSolvedBy = (questions_solver) => {
  var url = baseUrl + 'questions_solvers';
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(questions_solver),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response))
  .then(data =>{
      this.setState({questions_solvers: data})})
  }

  addQuestionSolved = (question) => {
  var url = baseUrl + 'questions_solvers';
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
    const questions = this.state.questions
    console.log('questions1', questions)
    const question = ({
      id: this.state.questions.length + 1,
      question_name: data.get('qname'),
      question: data.get('qtext'),
      solution: data.get('solution'),
      submitter: data.get('submitter')
    })
    console.log('submitted', question)
    questions.push(question)
    this.addQuestion(question)
    this.setState({ questions })
    // window.location.assign(homeUrl)
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
    window.location.assign(homeUrl)
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
            <Link to="/graphs">
              <button>Fun Graphs</button>
            </Link>
            <div>
              <Route path="/browselist" render={()=><BrowseList solvers={this.state.solvers}
                questions={this.state.questions}
                onDelete={this.onDelete}
                onQuestionSolverSubmit={this.onQuestionSolverSubmit}
                postName={this.postName}
                onSolverSubmit={this.onSolverSubmit}
                onDelete={this.onDelete}
                getSolvedBy={this.getSolvedBy}
                questions_solvers={this.state.questions_solvers}
                addSolvedBy={this.addSolvedBy}/>} />
              <Route path="/random" render={()=><RandomQ solvers={this.state.solvers}
                questions={this.state.questions}
                onDelete={this.onDelete}
                onQuestionSolverSubmit={this.onQuestionSolverSubmit}
                postName={this.postName}/>} />
              <Route path="/add" render={()=><Form questions={this.state.questions} onSubmit={this.onSubmit}/>} />
              <Route path="/graphs" render={()=><PeopleGraph questions={this.state.questions}/>} />

            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
