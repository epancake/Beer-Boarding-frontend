import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Downshift from 'downshift'

var baseUrl = 'http://beerboardapi.herokuapp.com/'
var homeUrl = 'http://localhost:3000/'

class QuestionCard extends Component {

  constructor(props) {
  super(props);

  this.state = {
    submitModalIsOpen: false,
    deleteModalIsOpen: false,
    solvers_here: [],
    toggleClass: true,
    selectedValue: '',
    solvers: [],
    solvedBy: []
  };

  const names = () => {
    return this.props.solvers.filter(
      item => item.solver_name
    )
  }

  this.openSubmitModal = this.openSubmitModal.bind(this);
  this.closeSubmitModal = this.closeSubmitModal.bind(this);
  this.openDeleteModal = this.openDeleteModal.bind(this);
  this.closeDeleteModal = this.closeDeleteModal.bind(this);
  this.cancelDelete = this.cancelDelete.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.deleteName = this.deleteName.bind(this);
  this.createOptionsList = this.createOptionsList.bind(this);
  this.submitSolver = this.submitSolver.bind(this);
  this.getSolvedBy = this.getSolvedBy.bind(this);
  this.onSolverSubmit = this.onSolverSubmit.bind(this);

  }

  componentDidMount () {
    this.getSolvedBy(this.props.question.id)
  }

  toggleFunction = () => {
    this.setState({toggleClass: !this.state.toggleClass})
  }

  openSubmitModal() {
    this.setState({submitModalIsOpen: true});
    this.setState({solvers_here: this.props.solvers.map(
      item => item.solver_name)})
  }

  closeSubmitModal() {
    this.setState({submitModalIsOpen: false});
    window.location.assign(homeUrl + 'browselist/')
  }

  cancelDelete() {
    this.setState({deleteModalIsOpen: false});
  }

  submitSolver(event) {
    event.preventDefault();
    console.log('submitted in the card')
    this.getSolvedBy(event);
    this.setState({submitModalIsOpen: false});
  }

  openDeleteModal() {
    this.setState({deleteModalIsOpen: true});
  }

  onDelete = (id, url) => {
    console.log(id, url)
  return fetch(url + '/' + id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(console.log('great succes'))
  .then(data =>{
      this.setState({solvers: data})});;
  }

  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
    console.log(this.value)
    this.onDelete(this.props.question.id, baseUrl + 'questions');
  }

  deleteName(e) {
    e.preventDefault()
    console.log('selected value:', this.state.selectedValue)
    this.onDelete(this.state.selectedValue, baseUrl + 'solvers');
  }

  handleChange (e) {
      this.setState({selectedValue: e.target.value})
      console.log('hi', e.target.value)
    }

  createOptionsList (item, index) {
      return (
        <option key={item.id} value={item.id}>
          {item.solver_name}
        </option>
      );
  }

  getOptionId (item, index) {
      return (
        <option key={item.id} value={item.id}>
          {item.id}
        </option>
      );
  }

  getSolvedBy (questionId) {
    console.log('fetching solvers')
    var url = baseUrl + 'solvedby/' + questionId;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          solvedBy: res.solvers
        })
        {/* res.solvers.forEach((item)=> this.state.solvedBy.push(item.solver_name)) */}
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
    }

    onSolverSubmit = (event) => {
      event.preventDefault()
      const form = event.target;
      const data = new FormData(form);
      const questions_solvers = this.props.questions_solvers
      const question_solver = ({
        id: questions_solvers.length + 1,
        quetions_id: this.props.question.id,
        solvers_id: parseInt(this.state.selectedValue)
      })
      console.log('obcect to submit', question_solver)
      this.props.questions_solvers.push(question_solver)
      this.props.addSolvedBy(question_solver)
      this.setState({ questions_solvers })
      // window.location.assign(homeUrl)
    }

  render() {

    let solvedByName = this.state.solvedBy.map(person => {
      return <span className='solvedbyitem'><br/>{person.solver_name}</span>
    })

    let solvedById = this.state.solvedBy.map(person => {
      return <span className='solvedbyitem'><br/>{person.id}</span>
    })


    return (
      <div className="card">

        <main className='maincard'>
          <h2 className='cardname'>#{this.props.question.id + ': ' + this.props.question.question_name}</h2>
          <div className="card-body">
            <div className='cardtext'>
              <div id='questionText'><strong>Question:</strong><br></br>{this.props.question.question.split("\n").map((i, index)=> {
            return <div key={i.length + index}>{i}</div>;})}</div>
              <div id='solutionText' onClick={this.toggleFunction}><strong>Solution:</strong> <span className='clicktext'>Click to show.</span><br></br><span className={this.state.toggleClass?'hidden':''}>{this.props.question.solution.split("\n").map((i, index) => {
            return <div key={i.length + index}>{i}</div>;})}</span></div>
              <p id='submitText'><strong>Submitted by:</strong> {this.props.question.submitter}</p>
              <p id='solverText'><strong>Solved by:</strong>{solvedByName}</p>
            </div>
          </div>
          <aside className="cardbuttons">
              <button onClick={this.openSubmitModal}>Solved!</button>
              <button id='delete' onClick={this.openDeleteModal}>Delete</button>
          </aside>

        </main>




        <Modal
          isOpen={this.state.submitModalIsOpen}
          onRequestClose={this.closeSubmitModal}
          contentLabel="Example Modal"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>What a champion!</h2>
        <form>
          <select onChange={(e) => this.setState({selectedValue: e.target.value})} name="name">
            {this.props.solvers.map(this.createOptionsList)}
          </select >
          <button onClick={this.onSolverSubmit}>Submit</button>
          <button onClick={this.closeSubmitModal}>Cancel</button>
        </form>
        <form onSubmit={this.props.postName}>
          <label>Don't see your name in the list? Add it:</label>
          <input type='text' name='newsolver'></input>
          <input type='submit' value='Add name'/>
        </form>
        <form onSubmit={this.deleteName}>
          <label>Delete a person (cruel!):</label>
          <select onChange={(e) => this.setState({selectedValue: e.target.value})} name="name" id="namelist">
            {this.props.solvers.map(this.createOptionsList)}
          </select >
          <input id='delete' type='submit' value='Delete name forever and all the data that goes with it'/>
        </form>
        </Modal>

        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.closeDeleteModal}
          contentLabel="Example Modal2"
        >
        <div>Are you sure? That bad huh? This will be removed from the questions database forever.</div>
        <button id='delete' onClick={this.closeDeleteModal}>Delete Question</button>
        <button onClick={this.cancelDelete}>Cancel</button>
        </Modal>

      </div>
    );
  }
}

export default QuestionCard;
