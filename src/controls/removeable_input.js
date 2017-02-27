import React, { Component } from 'react';
import './removeable_input.css';

class RemoveableInput extends Component {
  render() {
    return (
      <div className="removeable-input" >
          <button className="removeable-input-button" onClick={this.props.onClick}>x</button>
          <input className="removeable-input-input" value={this.props.value}
                  onChange={this.props.onChange} maxLength="1"/>
      </div>          
    );
  }
}

export default RemoveableInput;
