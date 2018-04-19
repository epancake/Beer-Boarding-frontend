import React from 'react'
import { Icon } from 'antd'

export default function Rules() {
  
    return  (
      <div>
        <h2 className="pageTitle">How to Beer Board</h2>
        <section className="rules">
            <p>Beer boarding starts promptly at 5pm. All members count off to make teams of 3 to 4 people. Each team takes a section of the whiteboard, and each team member gets to be the player for at least a 10 minutes, at the whiteboard.</p>
            <p>On each player’s 10 minute turn:</p>
            <ul>
                <li><Icon type="clock-circle" /> 1 minute: “Interviewers” choose a question from the list on this app.</li>
                <li><Icon type="clock-circle" /> 2 minutes: Interviewers ask the question to the player, and the player confirms and clarifies the question.</li>
                <li><Icon type="clock-circle" /> 6 minutes: Code! One interviewer should follow along in a repl, to figure out if the code works. Optional (but cool and recommended) strategies for the player include the following:
                    <ul className="subList">
                        <li><Icon type="table" className="subIcon"/>  Make an inputs/outputs table to confirm the question and consider edge cases.</li>
                        <li><Icon type="bulb" className="subIcon"/>  Think of a few different approaches and explain them, and why you chose the one you will use.</li>
                        <li><Icon type="code" className="subIcon"/>  Pseudo code the whole thing first to break out the pieces you need to accomplish.</li>
                        <li><Icon type="table" className="subIcon"/>  Create a scope table that lists variables and their values <a href="https://www.youtube.com/watch?v=ivrPSL4gJJ4">(see CJs video).</a></li>
                        <li><Icon type="sound" className="subIcon"/>  Don’t go dark! Talk through your strategy.</li>
                        <li><Icon type="team" className="subIcon"/>  If the other players want to help out they can say “cut” to break the interview scene and help the player out, and “action” to start it up again. </li>
                        <li><Icon type="smile-o" className="subIcon"/>  Laugh at yourself, have fun, it’s not real life.</li>
                    </ul>
                </li>
                <li><Icon type="clock-circle" /> 2 minutes: Interviewers give feedback to the player. Focus on the positive.</li>

            </ul>
        </section>

      </div>
    )
}

