import React from 'react';

const ColorButton = (props) => {
  return(
    <div 
      className={props.active} 
      style={{backgroundColor: props.color}}
      onClick={() => props.onClick(props.color)}>   
    </div>
  )
}

export default ColorButton;