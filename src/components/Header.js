import React, { Component } from 'react';
import logo from './beerlogo.png';

class Header extends Component {
  
  render() {
    return (
      <div className="App-header">
        <div id="App-title">
        <h1>Beer Boarding</h1>
        <p id="tagline">JavaScript Whiteboard Practice for Champions</p>
        </div>
        <img className='App-logo' src={logo} alt="Beers and boards equals friends"/>

      </div>
    );
  }
}

export default Header;
