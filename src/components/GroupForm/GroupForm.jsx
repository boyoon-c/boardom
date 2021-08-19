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
     <div class="mx-auto flex items-center">
       <div class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
          <div class="py-12 p-10 bg-white rounded-xl">
            <form
              ref={this.formRef}
              onSubmit={this.handleSubmit}
            >
              <h4>Name of group:</h4>
              <div class="w-full max-w-lg">
                <input 
                  class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Your Group Name"            type="text"
                  name="name"
                  value={this.state.formData.name}
                  onChange={this.handleChange}
                  required
                /> 
                <br />
                <h4>Description:</h4>
                <input
                  class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Your Group Description"            type="text"
                  name="description"
                  value={this.state.formData.description}
                  onChange={this.handleChange}
                  required
                />
                <button
                  type="submit"
                  disabled={this.state.invalidForm}
                  class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"            >
                  create
                </button>
          
              </div>
         
            </form>
          </div>
     </div>
</div>
      </>
     );
  }
}
 
export default GroupForm;