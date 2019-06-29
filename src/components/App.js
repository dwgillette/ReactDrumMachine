import React from 'react';
import '../App.scss';
import 'font-awesome/css/font-awesome.min.css';
import Power from './Power';
import Display from './Display';
import BankSelect from './BankSelect';
import Demo from './Demo';
import ColorControl from './ColorControl';
import PadGrid from './PadGrid';
import bankOne from '../bankData/banks/bankOne';
import bankTwo from '../bankData/banks/bankTwo';


// there is an interesting bug with Safari delaying HTML5 audio anywhere from 500-1000ms, making this app unusuable in that browser. Some googling indicates it's a common problem. I've been able to address 99% of the issue, but the audio playback is still a little buggy/unpredictable. Actively working to polish the last percent. Play with the app in Chrome for the best experience :) 

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePadBank: bankOne,
      color: {backgroundColor: '#01AEEE'},
      power: true,
      display: ''
    };
    this.changeColor = this.changeColor.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.togglePower = this.togglePower.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  changeBank() {
    if (this.state.activePadBank === bankOne) {
      this.setState({
        activePadBank: bankTwo,
        display: ''
      })
    } else {
      this.setState({
        activePadBank: bankOne,
        display: ''
      })
    }
  }
  
  changeColor(value) {
    this.setState({
      color: {backgroundColor: value}
    })
  }
  
  togglePower() {
    let inactiveColor = {backgroundColor: 'grey'}
    let activeColor = {backgroundColor: '#01AEEE'}
    console.log(this.state.color);
    if (this.state.power) {
      this.setState({
        power: !this.state.power,
        color: inactiveColor,
        display: ''
      })
    } else {
      this.setState({
        power: !this.state.power,
        color: activeColor
      })
    } 
  }
  
  updateDisplay(text) {
    if (this.state.power) {
      this.setState({
        display: text
      })
    }
  }
  
  render() {
    const bankSwitch = this.state.activePadBank === bankOne ? {
        float: 'left'
      } : {
        float: 'right'
      }
    return(
      <div id='drum-machine'>
        <div class='head'>
          <div class='logo'>
            <h1>R.JS-808</h1>
            <p>a react drum machine</p>
          </div>
          <Power onClick={this.togglePower} power={this.state.power}/>
        </div>
        <div class='boardContainer'>
          <div class='leftBoard'>
            <Display text={this.state.display}/>
            <BankSelect onClick={this.changeBank} position={bankSwitch}/>
            <Demo power={this.state.power} bank={this.state.activePadBank}/>
          </div>
          <div class='rightBoard'>
            <ColorControl onClick={this.changeColor} power={this.state.power}/>
            <PadGrid 
              activePadBank={this.state.activePadBank} 
              color={this.state.color}
              power={this.state.power}
              updateDisplay={this.updateDisplay}/>
          </div>
        </div>
      </div>
    );
  }
}

// mostly fixes the strange HTML5 audio delay in Safari
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export default DrumMachine;
