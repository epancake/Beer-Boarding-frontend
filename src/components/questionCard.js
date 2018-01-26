import React, { Component } from 'react';
import Modal from 'react-modal';

class QuestionCard extends Component {

  constructor() {
  super();

  this.state = {
    submitModalIsOpen: false,
    deleteModalIsOpen: false
  };

  this.openSubmitModal = this.openSubmitModal.bind(this);
  this.closeSubmitModal = this.closeSubmitModal.bind(this);
  this.openDeleteModal = this.openDeleteModal.bind(this);
  this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  openSubmitModal() {
    this.setState({submitModalIsOpen: true});
  }

  closeSubmitModal() {
    this.setState({submitModalIsOpen: false});
    window.location.assign('http://localhost:3001')
  }

  openDeleteModal() {
    this.setState({deleteModalIsOpen: true});
  }

  onDelete = (id, url) => {
    console.log(id, url)
  return fetch(url + '/' + id, {
    method: 'delete'
  })
  .then(console.log('great succes'));
  }

  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
    this.onDelete(this.props.question.id, 'http://localhost:3000/questions');
    window.location.assign('http://localhost:3001')
  }

  render() {
    return (

      <div className="card">

        <main id='main'>
          <h2>#{this.props.question.id + ': ' + this.props.question.question_name}</h2>
          <div className="card-body">
            <div>
              <p id='questionText'><strong>Question:</strong><br></br>{this.props.question.question}</p>
              <p id='solutionText'><strong>Solution:</strong><br></br>{this.props.question.solution}</p>
              <p id='submitText'><strong>Submitted by:</strong> {this.props.question.submitter}</p>
            </div>
            <aside>
              <button onClick={this.openSubmitModal}>Solved!</button>
              <button onClick={this.openDeleteModal}>Delete</button>
            </aside>
          </div>
        </main>




        <Modal
          isOpen={this.state.submitModalIsOpen}
          onRequestClose={this.closeSubmitModal}
          contentLabel="Example Modal"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>What a champion!</h2>
        <div>What's your full name?</div>
        <form>
          <input type='text'/>
        </form>
        <button onClick={this.closeSubmitModal}>Submit</button>
        </Modal>

        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.closeDeleteModal}
          contentLabel="Example Modal2"
        >
        <div>Are you sure? That bad huh?</div>
        <button onClick={this.closeDeleteModal}>Delete Question</button>
        </Modal>





      </div>
    );
  }
}

export default QuestionCard;
