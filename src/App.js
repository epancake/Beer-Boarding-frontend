import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from 'react-modal';
import Header from './components/Header.js'
import Success from './components/Success.js'
import Deleted from './components/Delete.js'
import BrowseList from './components/Browselist.js'
import RandomQ from './components/Randomq.js'
import Form from './components/Form.js'
import { Button } from 'antd'
import { Icon } from 'antd'



var baseUrl = 'https://beerboardapi.herokuapp.com/'
var homeUrl = 'https://beerboardingg70.firebaseapp.com'

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
          solvers: data.solvers.sort(function(a, b) {
            var nameA = a.solver_name.toUpperCase();
            var nameB = b.solver_name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
        }),
        questions_solvers: data.questions_solvers
      })});
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
  .then(res => {window.location.href='./success'; return res})
  .then(data =>{
      this.setState({questions: data})
      })
  .catch(error => console.error('Error:', error))
  }

  postName = (newsolver) => {
    const solvers = this.state.solvers;
    const solver = ({
      "id": this.getId(solvers),
      "solver_name": newsolver,
    })
    this.addSolver(solver)
  }

  getId = (array) => {
    let max = 0;
    array.forEach(item => {
      if (item.id > max) {
        max = item.id
      }
    }); return max + 1
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
  .then(res => {window.location.href='./success'; return res})
  .then(data =>{
    if (!data) return console.error("add solver error");
      this.setState({solvers: data})})
  .catch(error => console.error('Error:', error))
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
  .then(res => {window.location.href='./success'; return res})
  .then(data =>{
    if (!data) return console.error("add solver error");
      this.setState({questions_solvers: data})})
  .catch(error => console.error('Error:', error))

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
  }

  onSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const questions = this.state.questions
    const question = ({
      id: this.getId(questions),
      question_name: data.get('qname'),
      question: data.get('qtext'),
      solution: data.get('solution'),
      submitter: data.get('submitter')
    })
    this.addQuestion(question)
    this.setState({ questions })
  }

  onSubmitUpdate = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const questions = this.state.questions
    const question = ({
      "id": data.get('qid'),
      "question_name": data.get('qname'),
      "question": data.get('qtext'),
      "solution": data.get('solution'),
      "submitter": data.get('submitter')
    })
    this.updateQuestion(question)
  }

  updateQuestion = (question) => {
    var url = baseUrl + 'questions/' + question.id;
    fetch(url, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(question),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .then(res => {window.location.href='./success'; return res})
    .catch(error => console.error('Error:', error))
    .then(data =>{this.setState({questions: data})
    })
  }

  onQuestionSolverSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    const questions_solvers = this.state.questions_solvers
    const question_solver = ({
      id: this.state.questions.questions.length + 1,
      question_id: data.get('qname'),
      solver_id: data.get('qtext'),
    })
    questions_solvers.push(question_solver)
    this.addQuestion(question_solver)
    this.setState({ questions_solvers })
    window.location.href = homeUrl
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router >
          <div>
            <Link to="/browselist">
              <Button id='navbtn' >Browse Questions <Icon type="bars" /></Button>
            </Link>
            <Link to="/random">
              <Button>Random Question <Icon type="question-circle-o" /></Button>
            </Link>
            <Link to="/add">
              <Button>Add a Question <Icon type="plus-square-o" /></Button>
            </Link>
            <div className='parallax'>
              <div>
                <Route path="/browselist" render={()=><BrowseList key={456} solvers={this.state.solvers}
                  questions={this.state.questions}
                  onQuestionSolverSubmit={this.onQuestionSolverSubmit}
                  postName={this.postName}
                  onSolverSubmit={this.onSolverSubmit}
                  getSolvedBy={this.getSolvedBy}
                  questions_solvers={this.state.questions_solvers}
                  addSolvedBy={this.addSolvedBy}
                  onSubmitUpdate={this.onSubmitUpdate} />} />
                <Route path="/random" render={()=><RandomQ key={this.state.questions.length} solvers={this.state.solvers}
                  questions={this.state.questions}
                  onQuestionSolverSubmit={this.onQuestionSolverSubmit}
                  postName={this.postName}
                  onSolverSubmit={this.onSolverSubmit}
                  getSolvedBy={this.getSolvedBy}
                  questions_solvers={this.state.questions_solvers}
                  addSolvedBy={this.addSolvedBy}
                  onSubmitUpdate={this.onSubmitUpdate} />} />
                <Route path="/add" render={()=><Form questions={this.state.questions} onSubmit={this.onSubmit}/>} />
                <Route path="/success" render={()=><Success/>} />
                <Route path="/deleted" render={()=><Deleted/>} />
            </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
