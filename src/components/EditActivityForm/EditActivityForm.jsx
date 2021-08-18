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
    console.log("this is history", this.props)
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() { 
    //const { body } = this.state.formData
    return ( 
      <>
        <h1>Edit Activity Schedule</h1>
        <form 
            ref={this.formRef}
            autoComplete="off"
            onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label>Selected Activity: {this.state.formData.name}</label><br />
            <label>Previously Scheduled at: {this.state.formData.scheduledDate}</label><br />
            <input 
                name="scheduledDate"
                type="datetime-local"
                placeholder={this.props.location.state.activity.scheduledDate}
                //value={this.props.location.state.activity.scheduledDate}
                onChange={this.handleChange}
                required
            />
            {/* <input
              className="form-control"
              name="body"
              value={body}
              onChange={this.handleChange}
              required
            /> */}
    
          </div>
          {/* <Link
            className='btn btn-sm btn-warning'
            to={{
                pathname:'/addActivity',
            }}
            > Edit </Link> */}
		  <button
            type="submit"
            className='btn btn-sm btn-warning'
            disabled={this.state.invalidForm}
          >
            Edit Date
          </button>
        </form>
      </>
     );
  }
}
 
export default EditActivityForm;