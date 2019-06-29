import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Power = (props) => {
  let indicator;
  if (props.power === true) {
    indicator = { color: '#F032A1' } 
  } else {
    indicator = { color: 'rgb(40,40,40)' }
  }
  return (
      <i className="fa fa-power-off" 
        onClick={props.onClick} 
        style={indicator}></i>
  )
}

export default Power;