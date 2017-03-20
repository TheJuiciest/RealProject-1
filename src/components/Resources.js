import React from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import RecentSubmission from './RecentSubmission';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

var { username, date, location, topicTitle, submissionType, description, fd, comments, _id}= this.props.submission;    
const FormInstance = (    
    <form>
      <FieldGroup
        id="formControlsDate"
        type="date"
        label="date"
        value={date}
        onChange={this.dateChanged.bind(this)}
        placeholder="Enter Date of Event"
      />
      <FieldGroup
        id="location"
        type="text"
        label="location"
        placeholder="Enter location"
      />
      <FieldGroup
        id="formControlsTopic"
        label="topic"
        type="text"
        value={topicTitle} 
        onChange={this.topicTitleChanged.bind(this)}
        placeholder="Enter Topic"
      />
      <FieldGroup
        id="formControlsFile"
        type="file"
        label="File"
        help="Example block-level help text here."
      />


      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" onChange={(e)=>this.setState({'submissionType': e.target.value })} placeholder="select">
          <option value="select">Select Type of Submission</option>
          <option value="Hazard">Hazard</option>
          <option value="Lost Dog">Lost Dog</option>
          <option value="Found Dog">Found Dog</option>
          <option value="Current Condition">Current Condition</option>
          <option value="Community Event">Community Event</option>
          <option value="Other">Other</option>
        </FormControl>
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Description</ControlLabel>
        <FormControl componentClass="textarea" placeholder="textarea" value={description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" />
      </FormGroup>


      <Button type="submit" onClick={this.uploadFile.bind(this)}>
        Beam it Brah!
      </Button>
    </form>
);

export default FormInstance
