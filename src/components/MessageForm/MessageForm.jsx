import React, { Component } from 'react';


class MessagePost extends Component {
  state = { 
    invalidForm: true,
    formData: {
      body: '',
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
      //e.preventDefault();
      this.props.handleAddMessage(this.state.formData) //create and pass handleAddMessage from App
    };


  render() { 
    const { body } = this.state.formData
    return ( 
      <>
      <div class="min-h-screen -mt-20 py-4 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 w-11/12 max-w-xl sm:mx-auto">
          <div class="relative p-10 bg-white shadow-sm sm:rounded-xl">
            <form class="w-full"
              ref={this.formRef}
              onSubmit={this.handleSubmit}
            >
            <h3>Post A Message:</h3>

        <div class="mb-5 relative">
            <input 
            class="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
            autoComplete="off"
            type="text"
            name="body"
            value={this.state.formData.body}
            onChange={this.handleChange}
            placeholder="enter message post"
            required
            />
        </div>
            <button
              class="w-full bg-indigo-600 text-white p-3 rounded-md"
              type="submit"
              disabled={this.state.invalidForm}
            >
             Post
            </button>
      </form>
          
          </div>
        </div>
      </div>
      </>
     );
  }
}
 
export default MessagePost;