import React, { Component } from 'react';

class EditPuppy extends Component {
  state = { 
    invalidForm: false,
    formData: this.props.location.state.puppy //check on this
   }

   formRef = React.createRef()

   handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateMessage(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() { 
    const { body } = this.state.formData
    return ( 
      <>
        <h1>Edit Message</h1>
        <form 
					ref={this.formRef}
					autoComplete="off"
					onSubmit={this.handleSubmit}
				>
          <div className="form-group">
            <label>Message (required)</label>
            <input
              className="form-control"
              name="body"
              value={body}
              onChange={this.handleChange}
              required
            />
          </div>
					<button
            type="submit"
            className="btn btn-success"
            disabled={this.state.invalidForm}
          >
            Edit Message
          </button>
        </form>
      </>
     );
  }
}
 
export default EditPuppy;