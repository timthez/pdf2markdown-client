import React, { Component } from 'react';
import './number_input.css';


class NumberInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="number-input"> 
        <label className="number-input-label" >
          {this.props.label}
        </label>  
        <input  className="number-input-input" type="number" min="0" 
                max="20" step="0.1" value={this.props.value}
                onChange={this.props.onChange} />    
      </div>          
    );
  }
}

export default NumberInput;
