import React from 'react';
import ColorButton from './ColorButton';

const ColorControl = (props) => {
  let inactive = 'grey'
  if (props.power) {
    return(
      <div className='color-control'>
          <ColorButton active={'button'} color='#01AEEE' onClick={props.onClick}/>
          <ColorButton active={'button'} color='#04DF39' onClick={props.onClick}/>
          <ColorButton active={'button'} color='#F032A1' onClick={props.onClick}/>
          <ColorButton active={'button'} color='#FAA61A' onClick={props.onClick}/>
      </div>
  )} else {
    return(
    <div className='color-control'>
        <ColorButton active={'inactiveButton'} color={inactive} onClick={props.onClick}/>
        <ColorButton active={'inactiveButton'} color={inactive} onClick={props.onClick}/>
        <ColorButton active={'inactiveButton'} color={inactive} onClick={props.onClick}/>
        <ColorButton active={'inactiveButton'} color={inactive} onClick={props.onClick}/>
    </div>
  )}
}

export default ColorControl;