import React, { Component } from 'react';
import './App.css';
import ControlPanel from './control_panel/control_panel.js';
import Terminal from './terminal/terminal.js';
import Store from './store/store.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: {
        __html: ""
      }
    }
    Store.connect();
  }
  componentWillMount() {
    
    
  }
  componentWillUpdate() {
    this.shouldScrollBottom = this.terminal.scrollTop + this.terminal.offsetHeight === this.terminal.scrollHeight;
  }
   
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.terminal.scrollTop = this.terminal.scrollHeight
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PDF2Markdown</h1>
        </div>
        <div className="App-intro">
          <h2 className="App-control-panel-heading">Manager</h2>
          <h2 className="App-terminal-heading">Progress</h2>
          <ControlPanel />
          <Terminal />
        </div>
      </div>
    );
  }
}

export default App;
