import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown'

const names = ['emily', 'brian']

export class SolveModal extends Component {
  constructor() {
  super();

  this.state = {
    submitModalIsOpen: false,
    deleteModalIsOpen: false
  };

  this.openSubmitModal = this.openSubmitModal.bind(this);
  this.closeSubmitModal = this.closeSubmitModal.bind(this);
  }

  openSubmitModal() {
    this.setState({submitModalIsOpen: true});
        console.log('this.props.solvers', this.props.solvers)
  }

  closeSubmitModal() {
    this.setState({submitModalIsOpen: false});
    window.location.assign('http://localhost:3001')
  }

  render () {
    return (
      <Modal
        isOpen={this.state.submitModalIsOpen}
        onRequestClose={this.closeSubmitModal}
        contentLabel="Example Modal"
      >
      <h2 ref={subtitle => this.subtitle = subtitle}>What a champion!</h2>
      <form>
        <Dropdown options={names} onChange={this._onSelect} placeholder="Select an option" />
        <input type='text' name='sname'/>
      </form>
      <button onClick={this.closeSubmitModal}>Submit</button>
      </Modal>
    )
  }
}
