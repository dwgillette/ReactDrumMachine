import React from 'react';

const BankSelect = (props) => {
  return (
    <div class='bankDiv'>
      <div class='bankLabels'>
        <p>Heater Kit</p>
        <p>Piano Kit</p>
      </div>
      <div class='bankSelector' onClick={props.onClick}>
        <div id='bankButton' style={props.position}/>
      </div>
    </div>
  )
}

export default BankSelect;