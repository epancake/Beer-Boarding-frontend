import React, { Component } from 'react';
import Footer from './Footer.js'
import { Card, Avatar } from 'antd';
const { Meta } = Card;

class Home extends Component {

  render() {
    return (
      <div className="footer">
        <div className="bbDescription">
          <h4>About Beer Boarding</h4>
          <p>Beer Boarding is a meetup that was co-founded in 2017 by Galvanize students, to provide an arena to practice technical interview questions. Students and alumni meet at the Galvanize Denver Platte Street campus to practice JavaScript, code under (just a little) pressure, learn from each other, and drink beer.</p>
          <p>This App was created to facilitate the Denver meetup, but can be used by anyone, anywhere, who wants to practice JavaScript.</p>
          <h4>Beer Boarding Co-Founders</h4>
          <div className="founders">
            <Card
              hoverable
              style={{ width: 250 }}
              cover={<img alt="James" src="./JamesMannPhoto.png" />}
              className="founderCard"
            >
              <Meta
                title="James Mann"
                avatar={<Avatar src="./g70logo.png" />}
              />
              <div className="foundertaglines">
                <p className="foundertagline">Full Stack Developer</p>
                <p className="foundertagline">Front-End Specialist</p>
                <p className="foundertagline">Musician</p>
              </div>              
              <a className="portfolioSite" href="https://jamesmann.tech/" target="_blank" ref="noopener noreferrer">jamesmann.tech</a>
              <div className="contactsDiv">
                <a className="contactLink" href="https://github.com/mrsaxmannjr" target="_blank" ref="noopener noreferrer"><img alt="Github" className="icon" src="./004-circle.png"/></a>
                <a className="contactLink" href="https://www.linkedin.com/in/mrsaxmannjr/" target="_blank" ref="noopener noreferrer"><img alt="linked in" className="icon" src="./003-symbol.png"/></a>
              </div>
              <p className="quote">"You have to become one with the board."</p>
            </Card>
            <Card
              hoverable
              style={{ width: 250 }}
              cover={<img alt="Emily Pancake" src="./PancakePhoto.png" />}
            >
              <Meta
                title="Emily Pancake"
                avatar={<Avatar src="./g70logo.png" />}
              />
              <div className="foundertaglines">
              <p className="foundertagline">Full Stack Developer</p>
              <p className="foundertagline">Front-End Specialist</p>
              <p className="foundertagline">Design Enthusiast</p>
              </div>
              <a className="portfolioSite" href="https://emilypancake.com/" target="_blank" ref="noopener noreferrer">emilypancake.com</a>
              <div className="contactsDiv">
                <a className="contactLink" href="https://github.com/epancake" target="_blank" ref="noopener noreferrer"><img alt="github" className="icon" src="./004-circle.png"/></a>
                <a className="contactLink" href="https://www.linkedin.com/in/emilypancake/" target="_blank" ref="noopener noreferrer"><img alt="linked in" className="icon" src="./003-symbol.png"/></a>
              </div>
              <p className="quote">"Put the fun back into function."</p>
            </Card>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
