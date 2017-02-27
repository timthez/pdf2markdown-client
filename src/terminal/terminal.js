import React, { Component } from 'react';
import Store from '../store/store.js';

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: {
        __html: ""
      }
    }
  }
  componentWillMount() {
    Store.subscribeProgress(this.update.bind(this));
    
  }
  componentWillUpdate() {
    this.shouldScrollBottom = this.terminal.scrollTop + this.terminal.offsetHeight === this.terminal.scrollHeight;
  }
   
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.terminal.scrollTop = this.terminal.scrollHeight
    }
  }
  update(){
    this.setState({
      text:{
        __html: Store.getProgress()
      }
    })
  }
  
  render() {
    return (
      <div className="App-terminal" ref={(input) => { this.terminal = input; }} >
        <code className="App-terminal-logger" dangerouslySetInnerHTML={this.state.text} />
      </div>
    );
  }
}

export default Terminal;
