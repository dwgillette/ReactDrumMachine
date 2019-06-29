import React from 'react';
import bankOne from '../bankData/banks/bankOne';
import bankTwo from '../bankData/banks/bankTwo';
import bankOnePatternOne from '../bankData/patterns/bankOnePatternOne';
import bankOnePatternTwo from '../bankData/patterns/bankOnePatternTwo';
import bankTwoPatternOne from '../bankData/patterns/bankTwoPatternOne';
import bankTwoPatternTwo from '../bankData/patterns/bankTwoPatternTwo';

function playStep(keyCode) {
  const ke = new KeyboardEvent("keydown", {
        bubbles: true, cancelable: true, keyCode: keyCode
        });
  document.body.dispatchEvent(ke);
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

export default Demo;