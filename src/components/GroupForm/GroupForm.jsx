import React, { Component } from 'react';

class GroupForm extends Component {
  state = { 
    invalidForm: true,
    formData: {
      name: '',
      description: ''
    }
   }

   formRef = React.createRef();

   handleChange = e => {
     const formData = {...this.state.formData, [e.target.name]: e.target.value};
     this.setState({
     formData,
     invalidForm: !this.formRef.current.checkValidity()
     });
   };

   handleSubmit = e => {
		e.preventDefault();
    this.props.history.push(`/group`)
  };
 
  render() { 
    const { name, description } = this.state.formData 
    return ( 
      <>
      <form
        ref={this.formRef}
        onSubmit={this.handleSubmit}
      >
        <h2>Name of group:</h2>
        <input 
          type="text"
          name="name"
          value={this.state.formData.name}
          onChange={this.handleChange}
          required
        /> <br />
        <h2>Description:</h2>
        <input
          type="text"
          name="description"
          value={this.state.formData.description}
          onChange={this.handleChange}
        />
        <button
          type="submit"
    			disabled={this.state.invalidForm}
        >
				  create
        </button>         
      </form>
      </>
     );
  }
}
 
export default GroupForm;