import React from 'react';
import DrumPad from './DrumPad';

class PadGrid extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let padBank;
    if (this.props.power === true) {
      padBank = this.props.activePadBank.map((padObj) => { 
        return(
          <DrumPad 
            clipId={padObj.id}
            keyName={padObj.key}
            keyCode={padObj.keyCode}
            audio={padObj.url}
            color={this.props.color}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}/>
        )
      })
    } else {
      padBank = this.props.activePadBank.map((padObj) => { 
        return(
          <DrumPad 
            clipId={padObj.id}
            keyName={padObj.key}
            keyCode={padObj.keyCode}
            audio='#'
            color={this.props.color}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}/>
        )
      })
    }
    
    return(
    <div className='pad-grid'>
      {padBank}
    </div>
  )} 
}

export default PadGrid;