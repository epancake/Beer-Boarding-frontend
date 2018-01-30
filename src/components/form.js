import React from 'react'

export default function Form({ onSubmit }) {
    return  (
      <form className='addform' id='form' onSubmit={onSubmit}>
        <label className='add qname-label' htmlFor="qname">Question Name:</label>
        <input className='add qname-field' type="text" name="qname"></input>
        <label className='add qtext-label' htmlFor="qtext">Question:</label>
        <textarea className='add qtext-field' name="qtext" rows="5"></textarea>
        <label className='add sname-label' htmlFor="solution">Solution:</label>
        <textarea className='add sname-text' name="solution" rows="5"></textarea>
        <label className='add subm-label' htmlFor="submitter">Your First and Last Name:</label>
        <input className='add subm-text' type="text" name="submitter"></input>
        <input className='add addqbutn' type="submit" value="Submit"/>
      </form>
    )
}
