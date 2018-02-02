import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button } from 'antd';
import { Icon } from 'antd';

var baseUrl = 'http://beerboardapi.herokuapp.com/'
var homeUrl = 'http://localhost:3000/'

class QuestionCard extends Component {

  constructor(props) {
  super(props);

  this.state = {
    submitModalIsOpen: false,
    deleteModalIsOpen: false,
    updateModalIsOpen: false,
    solvers_here: [],
    toggleClass: true,
    selectedValue: '',
    solvers: [],
    solvedBy: [],
    formData: {...props.question},
    newSolver: ""
  };

  // const names = () => {
  //   return this.props.solvers.filter(
  //     item => item.solver_name
  //   )
  // }

  this.openSubmitModal = this.openSubmitModal.bind(this);
  this.closeSubmitModal = this.closeSubmitModal.bind(this);
  this.openDeleteModal = this.openDeleteModal.bind(this);
  this.closeDeleteModal = this.closeDeleteModal.bind(this);
  this.openUpdateModal = this.openUpdateModal.bind(this);
  this.closeUpdateModal = this.closeUpdateModal.bind(this);
  this.cancelDelete = this.cancelDelete.bind(this);
  this.cancelUpdate = this.cancelUpdate.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.deleteName = this.deleteName.bind(this);
  this.createOptionsList = this.createOptionsList.bind(this);
  this.submitSolver = this.submitSolver.bind(this);
  this.getSolvedBy = this.getSolvedBy.bind(this);
  this.onSolverSubmit = this.onSolverSubmit.bind(this);

  }

  componentDidMount () {
    this.getSolvedBy(this.props.question.id)
    console.log('cardprops', this.props)
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

  cancelUpdate() {
    this.setState({updateModalIsOpen: false});
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

  openUpdateModal() {
    this.setState({updateModalIsOpen: true});
  }

  onDelete = (id, url) => {
    console.log(id, url)
  return fetch(url + '/' + id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => {window.location.assign(homeUrl + 'deleted'); return res})
  .then(data =>{
    if (!data) return console.error('no data on delete response');
      this.setState({solvers: data})})
  .then(console.log('great succes'))
  }

  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
    console.log(this.value)
    this.onDelete(this.props.question.id, baseUrl + 'questions');
  }

  closeUpdateModal() {
    this.setState({updateModalIsOpen: false});
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
        "id": questions_solvers.length + 1,
        "questions_id": this.props.question.id,
        "solvers_id": parseInt(this.state.selectedValue)
      })
      console.log('object to submit', question_solver)
      this.props.questions_solvers.push(question_solver)
      console.log('array', this.props.questions_solvers)
      this.props.addSolvedBy(question_solver)
      this.setState({ questions_solvers })
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
              <Button id='ant-btn-primary'onClick={this.openSubmitModal} type="primary">Solved! <Icon type="check-circle-o" /></Button>
              <Button id='delete' onClick={this.openDeleteModal} type="danger">Delete <Icon type="delete" /></Button>
              <Button id='update' onClick={this.openUpdateModal} type="primary">Update <Icon type="edit" /></Button>

          </aside>

        </main>




        <Modal
          isOpen={this.state.submitModalIsOpen}
          onRequestClose={this.closeSubmitModal}
          contentLabel="Solved Modal"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>What a champion!</h2>
        <form>
          <select onChange={(e) => this.setState({selectedValue: e.target.value})} name="name">
            {this.props.solvers.map(this.createOptionsList)}
          </select >
          <Button onClick={this.onSolverSubmit}>Submit</Button>
          <Button onClick={this.closeSubmitModal}>Cancel</Button>
        </form>
        <form>
          <label>Don't see your name in the list? Add it:</label>
          <input type='text' name='newsolver' onChange={(e)=>{this.setState({newSolver: e.target.value}); console.log(this.state.newSolver)}}></input>
          <Button onClick={()=>this.props.postName(this.state.newSolver)} type='submit' value='Add name'>Add Name</Button>
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
          contentLabel="Delete Modal"
        >
        <p>Are you sure you want to delete this question <strong>and all of the data </strong>that goes with it?</p>
        <Button id='delete' type="danger" onClick={this.closeDeleteModal}>Delete!</Button>
        <Button type="primary" onClick={this.cancelDelete}>Cancel</Button>
        </Modal>

        <Modal
          isOpen={this.state.updateModalIsOpen}
          onRequestClose={this.closeUpdateModal}
          contentLabel="Update Modal"
        >
          <Button type="primary" onClick={this.cancelUpdate}>Cancel</Button>
          <h3>Update the question</h3>
          <p>Fill in all the fields and the question will be updated. If you leave any fields blank, the question will be blank too.</p>
          <form className='addform' id='form' onSubmit={this.props.onSubmitUpdate}>
            <label className='add qid-label hidden' htmlFor="qid">Question ID:</label>
            <input className='add qid-field hidden' type="text" name="qid" defaultValue={this.state.formData.id}></input>
            <label className='add qname-label' htmlFor="qname" >Question Name:</label>
            <input className='add qname-field' type="text" name="qname" defaultValue={this.state.formData.question_name}></input>
            <label className='add qtext-label' htmlFor="qtext">Question: </label>
            <textarea className='add qtext-field' name="qtext" rows="5" defaultValue={this.state.formData.question}></textarea>
            <label className='add sname-label' htmlFor="solution">Solution: </label>
            <textarea className='add sname-text' name="solution" rows="5" defaultValue={this.state.formData.solution}></textarea>
            <label className='add subm-label' htmlFor="submitter">Your First and Last Name:</label>
            <input className='add subm-text' type="text" name="submitter" defaultValue={this.state.formData.submitter}></input>
            <input className='add addqbutn' type="submit" value="Submit"/>
          </form>
        </Modal>

      </div>
    );
  }
}

export default QuestionCard;
