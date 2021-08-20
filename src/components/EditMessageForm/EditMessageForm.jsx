import React, { Component } from 'react';

class EditMessageForm extends Component {
  state = { 
    invalidForm: false,
    formData: this.props.location.state.message //check on this
   }

   formRef = React.createRef()

   handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateMessage(this.state.formData)
    e.target.reset()
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    })
  }

  render() { 
    const { body } = this.state.formData
    return ( 
      <>
      <div class="min-h-screen -mt-20 py-4 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 w-11/12 max-w-xl sm:mx-auto">
          <div class="relative p-10 bg-white shadow-sm sm:rounded-xl">

        <h1>Edit Message</h1>
        <form 
          class="w-full"
					ref={this.formRef}
					autoComplete="off"
					onSubmit={this.handleSubmit}
				>
          <div className="form-group">
            <label>Message (required)</label>
            <input
              class="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
              name="body"
              value={body}
              onChange={this.handleChange}
              required
            />
          </div>
					<button
            type="submit"
            class="w-full mt-2 bg-indigo-600 text-white p-3 rounded-md"
            disabled={this.state.invalidForm}
          >
            Edit Message
          </button>
        </form>
      </div>
    </div>
  </div>

      </>
     );
  }
}
 
export default EditMessageForm;