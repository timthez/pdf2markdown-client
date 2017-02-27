import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Store from '../store/store.js';
import './control_panel.css';
import NumberInput from '../controls/number_input.js';
import GroupBox from '../containers/group_box.js';
import RemoveableInput from '../controls/removeable_input.js';
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      config: Store.getConfig(),
      file: null
    }
  }
  componentWillMount(){
    Store.subscribeConfig(this.update.bind(this));
    this.update();
  }
  update(){
    this.setState({config: Store.getConfig()});
  }
  onDrop (acceptedFiles, rejectedFiles) {
    if(acceptedFiles.length > 0){
      this.setState({file: acceptedFiles[0]})
    }
      
    console.log(acceptedFiles[0]);
  }
  pageDimensionsChange(field,e){
    this.state.config.dimensions[field] = Number(e.target.value);
    Store.updateConfig(this.state.config);
  }
  pageMarginChange(field,e){
    this.state.config.dimensions[field] = Number(e.target.value);
    Store.updateConfig(this.state.config);
  }
  onULChange(index,e){
    this.state.config.ul.tokens[index] = e.target.value;
    Store.updateConfig(this.state.config);
  }
  onULRemove(index){
    this.state.config.ul.tokens.splice(index,1);
    Store.updateConfig(this.state.config);
  }
  onULAdd(){
    this.state.config.ul.tokens.push("");
    Store.updateConfig(this.state.config);
  }
  submit(){
    Store.process(this.state.file);  
  }
  headingChange(heading,field,e){
    this.state.config.headings[heading][field] = Number(e.target.value);
    Store.updateConfig(this.state.config);
  }
  render() {
    return (
      <div className="control-panel"> 
          <GroupBox label="Heading 1">
            <NumberInput label="Size(px)" value={this.state.config.headings.h1.size} onChange={this.headingChange.bind(this,"h1","size")} />
            <NumberInput label="Tolerance" value={this.state.config.headings.h1.tolerance} onChange={this.headingChange.bind(this,"h1","tolerance")} />
          </GroupBox>
          <GroupBox label="Heading 2">
            <NumberInput label="Size(px)" value={this.state.config.headings.h2.size} onChange={this.headingChange.bind(this,"h2","size")} />
            <NumberInput label="Tolerance" value={this.state.config.headings.h2.tolerance} onChange={this.headingChange.bind(this,"h2","tolerance")} />
          </GroupBox>
          <GroupBox label="Heading 3">
            <NumberInput label="Size(px)" value={this.state.config.headings.h3.size} onChange={this.headingChange.bind(this,"h3","size")} />
            <NumberInput label="Tolerance" value={this.state.config.headings.h3.tolerance} onChange={this.headingChange.bind(this,"h3","tolerance")} />
          </GroupBox>
          <GroupBox label="Heading 4">
            <NumberInput label="Size(px)" value={this.state.config.headings.h4.size} onChange={this.headingChange.bind(this,"h4","size")} />
            <NumberInput label="Tolerance" value={this.state.config.headings.h4.tolerance} onChange={this.headingChange.bind(this,"h4","tolerance")} />
            <NumberInput label="Percent" value={this.state.config.headings.h4.percent} onChange={this.headingChange.bind(this,"h4","percent")} />
            <NumberInput label="Max #" value={this.state.config.headings.h4.maxNumberFonts} onChange={this.headingChange.bind(this,"h4","maxNumberFonts")} />
          </GroupBox>
          <GroupBox label="Heading 5">
            <NumberInput label="Size(px)" value={this.state.config.headings.h5.size} onChange={this.headingChange.bind(this,"h5","size")} />
            <NumberInput label="Tolerance" value={this.state.config.headings.h5.tolerance} onChange={this.headingChange.bind(this,"h5","tolerance")} />
            <NumberInput label="Percent" value={this.state.config.headings.h5.percent} onChange={this.headingChange.bind(this,"h5","percent")} />
            <NumberInput label="Max #" value={this.state.config.headings.h5.maxNumberFonts} onChange={this.headingChange.bind(this,"h5","maxNumberFonts")} />
          </GroupBox>
          <GroupBox label="Unordered List Tokens">
            <div className="unordered-list">
              {
                this.state.config.ul.tokens.map((token,i)=>{
                  return (
                    <RemoveableInput value={token} key={"ul_"+i}
                                     onChange={this.onULChange.bind(this,i)} onClick={this.onULRemove.bind(this,i)} />
                  )
                })
              }
              <button className="unordered-list-add-button" onClick={this.onULAdd.bind(this)} >+</button>             
            </div>
          </GroupBox>
          <GroupBox label="Page Dimensions (Inches)">
            <NumberInput label="Width:" value={this.state.config.dimensions.width} onChange={this.pageDimensionsChange.bind(this,"width")} />
            <NumberInput label="Height:" value={this.state.config.dimensions.height} onChange={this.pageDimensionsChange.bind(this,"height")} />
          </GroupBox>  
          <GroupBox label="Page Margins (Inches)">
            <NumberInput label="Top" value={this.state.config.rawMargin.top} onChange={this.pageMarginChange.bind(this,"top")} />
            <NumberInput label="Bottom" value={this.state.config.rawMargin.bottom} onChange={this.pageMarginChange.bind(this,"bottom")} />
            <NumberInput label="Left" value={this.state.config.rawMargin.left} onChange={this.pageMarginChange.bind(this,"left")} />
            <NumberInput label="Right" value={this.state.config.rawMargin.right} onChange={this.pageMarginChange.bind(this,"right")} />
          </GroupBox>
          <GroupBox label="Select File">
            <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)} multiple={false} >
              <div>{this.state.file ? this.state.file.name : "Drag & Drop File or Click Here"}</div>
            </Dropzone>
            <button onClick={this.submit.bind(this)} disabled={this.state.file ? null : "disabled" }>Submit</button>
          </GroupBox>
          <div className="scrollable-area"></div>
    </div>
          
    );
  }
}

export default ControlPanel;
