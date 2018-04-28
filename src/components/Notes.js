import React, { Component } from 'react';
import logo from './logo.png';
import { Link } from "react-router-dom";
import { Button } from 'antd'
import { Icon } from 'antd'

class Notes extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      toggleNotes: true,
    };
  
    }
  
    toggleNotesFunction = () => {
      this.setState({toggleNotes: !this.state.toggleNotes})
    }

  render() {
    return (
      <div id='notes'> 
                <span onClick={this.toggleNotesFunction} className='NoteExpander'>
                  <strong>Take Notes <Icon type={this.state.toggleNotes?'plus-square':'minus-square'} /></strong>
                </span>
                <span className={this.state.toggleNotes?'hidden notesLine':'notesLine'}>
                  <textarea placeholder="Jot down some notes here" cols="10" rows="3"></textarea>
                  <br></br>
                  
                  <fieldset>
                    <p className="notesQuestion"><Icon type="check" />Did they confirm inputs/outputs?</p>
                    <div className="notesAnswers">
                      <div className="notesAnswer">
                        <input type="checkbox" id="No" name="interest" value="No"/>
                        <label htmlFor="No" className="checkboxLabel">No</label>
                      </div>
                      <div className="notesAnswer">
                        <input type="checkbox" id="Yes" name="interest" value="Yes"/>
                        <label htmlFor="Yes" className="checkboxLabel">Yes</label>
                      </div>
                    </div>
                    
                    <p className="notesQuestion"><Icon type="check" />Did they verbalize their approach before writing?</p>
                    <div className="notesAnswers">
                      <div className="notesAnswer">
                        <input type="checkbox" id="No" name="interest" value="No"/>
                        <label htmlFor="No" className="checkboxLabel">No</label>
                      </div>
                      <div className="notesAnswer">
                        <input type="checkbox" id="Yes" name="interest" value="Yes"/>
                        <label htmlFor="Yes" className="checkboxLabel">Yes</label>
                      </div>
                    </div>

                    <p className="notesQuestion"><Icon type="check" />Did they run through / test at the end?</p>
                    <div className="notesAnswers">
                      <div className="notesAnswer">
                        <input type="checkbox" id="No" name="interest" value="No"/>
                        <label htmlFor="No" className="checkboxLabel">No</label>
                      </div>
                      <div className="notesAnswer">
                        <input type="checkbox" id="Yes" name="interest" value="Yes"/>
                        <label htmlFor="Yes" className="checkboxLabel">Yes</label>
                      </div>
                    </div>

                    <p className="notesQuestion"><Icon type="check" />Did the code compile?</p>
                    <div className="notesAnswers">
                      <div className="notesAnswer">
                        <input type="checkbox" id="No" name="interest" value="No"/>
                        <label htmlFor="No" className="checkboxLabel">No</label>
                      </div>
                      <div className="notesAnswer">
                        <input type="checkbox" id="Yes" name="interest" value="Yes"/>
                        <label htmlFor="Yes" className="checkboxLabel">Yes</label>
                      </div>
                    </div>
                  </fieldset>                 
                </span>
              </div>
    );
  }
}

export default Notes;
