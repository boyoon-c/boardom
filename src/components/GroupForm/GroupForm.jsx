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
    this.props.handleCreateGroup(this.state.formData)
  };
 
  render() { 
    const { name, description } = this.state.formData 
    return ( 
      <>
     <div class="container mx-auto h-full flex flex-1 justify-center items-center">
      <form
        ref={this.formRef}
        onSubmit={this.handleSubmit}
      >
        <h4>Name of group:</h4>
        <div class="w-full max-w-lg">
          <input 
          class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
            type="text"
            name="name"
            value={this.state.formData.name}
            onChange={this.handleChange}
            required
          /> 
          <br />
          <h4>Description:</h4>
          <input
            class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
            type="text"
            name="description"
            value={this.state.formData.description}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            disabled={this.state.invalidForm}
            class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
            >
            create
          </button>
          
        </div>
         
      </form>
      </div>





      </>
     );
  }
}
 
export default GroupForm;