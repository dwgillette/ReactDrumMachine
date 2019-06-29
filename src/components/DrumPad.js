import React from 'react';

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

export default DrumPad;