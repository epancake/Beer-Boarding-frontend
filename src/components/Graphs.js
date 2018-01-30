import React from 'react'
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};

const PeopleGraph = (props) => {

const Linechart = ({ data }) =>
<C3Chart data={{ json: data }} />

  return (
    <div>
    <div>{Linechart}</div>
    <p>hiiiii</p>
    </div>
  )

}

export default PeopleGraph;
