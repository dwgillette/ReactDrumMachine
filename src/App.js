import React from 'react';
import './App.scss';
import 'font-awesome/css/font-awesome.min.css';

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

const Display = (props) => {
  return (
    <div id='display'>
      <p>{props.text}</p>
    </div>
  )
}

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

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      color: {color: 'rgb(40,40,40)'},
      step: 0
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.playDemo = this.playDemo.bind(this);
    this.playPattern = this.playPattern.bind(this)
  }
  
  componentWillReceiveProps(newProps) {
    if (!newProps.power & this.state.play) {
      this.togglePlay();
    }
  } 
  
  playDemo() {
    if (this.state.play & this.props.bank === bankOne) {
      this.playPattern(bankOnePatternOne, bankOnePatternTwo, 180);
    } else if (this.state.play & this.props.bank === bankTwo) {
      this.playPattern(bankTwoPatternOne, bankTwoPatternTwo, 375);
    }
  }
  
 playPattern(pattern1, pattern2, tempo) {
   playStep(pattern1[this.state.step])
   playStep(pattern2[this.state.step])
   if (this.state.step >= pattern1.length -1) {
     this.setState({
       step: 0
     })
   } else {
     this.setState({
       step: this.state.step+1
     })
   }
   setTimeout(()=>{this.playDemo()}, tempo);
 }
  
  togglePlay() {
    if (this.props.power) {
      if (this.state.play) {
        this.setState({
          play: !this.state.play,
          color: {color: 'rgb(40,40,40)'}
        })
      } else {
        this.setState({
          play: !this.state.play,
          color: {color: '#FAA61A'},
          step: 0
        });
        setTimeout(()=>{this.playDemo();},100);
      } 
    }
  }
  
  render() {
    return(
      <div className='demo' onClick={this.togglePlay} style={this.state.color}>
        <h1>DEMO</h1>
      </div>
    )
  }
}

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

const ColorButton = (props) => {
  return(
    <div 
      className={props.active} 
      style={{backgroundColor: props.color}}
      onClick={() => props.onClick(props.color)}>   
    </div>
  )
}

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

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      padStyle: this.props.color
    }
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({
      padStyle: newProps.color
    })
  } 
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
   
  handleTrigger() {
    const activeStyle = {...this.props.color, 
                 filter: 'brightness(2.5)', 
                 boxShadow: '1px 1px 0px 1px black',
                 transform: 'translate(1px, 2px)'}
    const passiveStyle = {...this.props.color,  
                 boxShadow: '1px 1px 0px 1px black',
                 transform: 'translate(1px, 2px)'}
    if (this.props.power === true) {
      this.setState({
        padStyle: activeStyle
      })
    } else {
      this.setState({
        padStyle: passiveStyle
      })
    }
    setTimeout(() => {
      this.setState({
        padStyle: this.props.color
      })
    }, 100)
  }
  
  playSound() {
    const sound = document.getElementById(this.props.keyName);
    sound.currentTime = 0;
    sound.volume = 1;
    sound.play();
    setTimeout(()=>{this.props.updateDisplay(this.props.clipId)},101) // could not get handleTrigger animation to work on click without setting this delay
    this.handleTrigger();
  }
  
  render(){
    return(
      <div 
        className='drum-pad'
        id={this.props.clipId}
        style={this.state.padStyle}
        keyCode={this.props.keyCode}
        onClick={this.playSound}>
        {this.props.keyName}
        <audio 
          className='clip' 
          id={this.props.keyName} 
          src={this.props.audio}>
        </audio>
      </div>  
    )
  }  
}

function playStep(keyCode) {
  const ke = new KeyboardEvent("keydown", {
        bubbles: true, cancelable: true, keyCode: keyCode
        });
  document.body.dispatchEvent(ke);
}

const bankOnePatternOne = [
  67, 90, 83, 90,
  67, 90, 83, 90,
  88, 90, 83, 90,
  67, 90, 83, 90,
  
  69, 90, 83, 90,
  88, 90, 83, 90,
  69, 67, 67, 67,
  67, 67, 67, 68,
]

const bankOnePatternTwo = [
  65, null, 65, null,
  65, null, 65, null,
  65, null, 65, null,
  65, null, 65, 68,
  
  81, null, 65, null,
  65, 68, 87, 90,
  65, 90, 87, 90,
  87, 90, 87, 90  
]

const bankTwoPatternOne = [
  90, 83, 88, 68,
  90, 83, 88, 68,
  90, 83, 88, 68,
  90, 83, 88, 68,
  
  90, 83, 88, 68,
  90, 83, 88, 68,
  90, 83, 88, 68,
  90, 83, 88, 67
]

const bankTwoPatternTwo = [
  81, null, null, null,
  81, null, null, null,
  81, null, null, 65,
  87, 65, null, 87,
  
  69, 67, null, 65,
  69, null, null, 65,
  69, null, null, 65,
  69, 67, null, 69
]

const bankOne = [
  {
    key: 'Q',
    id: 'Heater-1',
    keyCode: 81,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  } , {
    key: 'W',
    id: 'Heater-2',
    keyCode: 87,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  } , {
    key: 'E',
    id: 'Heater-3',
    keyCode: 69,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  } , {
    key: 'A',
    id: 'Heater-4',
    keyCode: 65,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  } , {
    key: 'S',
    id: 'Clap',
    keyCode: 83,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  } , {
    key: 'D',
    id: 'Open-HH',
    keyCode: 68,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  } , {
    key: 'Z',
    id: "Kick",
    keyCode: 90,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' 
  } , {
    key: 'X',
    id: "Kick-n'-Hat",
    keyCode: 88,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  } , {
    key: 'C',
    id: 'Closed-HH',
    keyCode: 67,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const bankTwo = [
  {
    key: 'Q',
    id: 'Chord-1',
    keyCode: 81,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  } , {
    key: 'W',
    id: 'Chord-2',
    keyCode: 87,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  } , {
    key: 'E',
    id: 'Chord-3',
    keyCode: 69,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  } , {
    key: 'A',
    id: 'Shaker',
    keyCode: 65,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  } , {
    key: 'S',
    id: 'Closed-HH',
    keyCode: 83,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' 
  } , {
    key: 'D',
    id: 'Open-HH',
    keyCode: 68,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  } , {
    key: 'Z',
    id: "Punchy-Kick",
    keyCode: 90,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  } , {
    key: 'X',
    id: 'Snare',
    keyCode: 88,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' 
  } , {
    key: 'C',
    id: 'Side-Stick',
    keyCode: 67,
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  }
]

// mostly fixes the strange HTML5 audio delay in Safari
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export default DrumMachine;
