import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class EditActivityForm extends Component {
  state = { 
    invalidForm: false,
    formData: this.props.location.state.activity 
   }

   formRef = React.createRef()

   handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateActivity(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() { 
    return ( 
      <>
      <div className="d-flex flex-column bd-highlight mb-3 justify-content-center text-center">

        <h1>Edit Activity Schedule</h1>
        <form 
            ref={this.formRef}
            autoComplete="off"
            onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label>Selected Activity: {this.state.formData.name}</label><br />
            <label>Previously Scheduled at: {this.props.location.state.activity.scheduledDate}</label><br />
            <input 
                name="scheduledDate"
                type="datetime-local"
                placeholder={this.props.location.state.activity.scheduledDate}
                onChange={this.handleChange}
                required
            />

    
          </div>
          
		      <button
            type="submit"
            className='btn btn-sm btn-warning'
            disabled={this.state.invalidForm}
          >
            Edit Date
          </button>
          </form>
          </div>
      </>
     );
  }
}
 
export default EditActivityForm;