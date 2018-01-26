import React, { Component } from 'react';

export default function Form({ onSubmit }) {
    return  (
      <form id='form' onSubmit={onSubmit}>
        <label htmlFor="qname">Question Name:</label>
        <input type="text" name="qname"></input>
        <label htmlFor="qtext">Question:</label>
        <textarea name="qtext" rows="10"></textarea>
        <label htmlFor="solution">Solution:</label>
        <textarea name="qname" rows="10"></textarea>
        <label htmlFor="submitter">Your First and Last Name:</label>
        <input type="text" name="submitter"></input>
        <input type="submit" value="Submit"/>
      </form>
    )
}
