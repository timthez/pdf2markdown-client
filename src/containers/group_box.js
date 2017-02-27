import React, { Component } from 'react';
import './group_box.css';

class GroupBox extends Component {

  render() {
    return (
      <div className="group-box"> 
        <div className="group-box-label" >
          {this.props.label}
        </div>
        {this.props.children}
      </div>
          
    );
  }
}

export default GroupBox;
