import React, { Component } from 'react';
import logo from './logo.png';
import { Link } from "react-router-dom";
import { Button } from 'antd'
import { Icon } from 'antd'

class Header extends Component {

  render() {
    return (
      <div className="App-header">
        <div id="App-title">
        <div className="headerStart">
          <div className="headerAndLogo">
           <img className="logo" src={logo} alt="Beers and boards equals friends"/>
           <h1><a href="/" className="mainHeading">Beer Boarding</a></h1>
          </div>
          <p><a href="/" className="aboutLink"><Icon type="info-circle" /></a></p>
        </div>
        </div>
        <p id="tag">JavaScript Whiteboard Practice for Champions</p>
      </div>
    );
  }
}

export default Header;
