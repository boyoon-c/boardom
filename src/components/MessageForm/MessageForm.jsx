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
      e.preventDefault();
      this.props.handleAddMessage(this.state.formData) //create and pass handleAddMessage from App
    };

  render() { 
    return ( 
      <>
        <h3>Message:</h3>
        <input 
          type="text"
          name="body"
          value={this.state.formData.body}
          onChange={this.handleChange}
          required
        />
      </>
     );
  }
}
 
export default MessagePost;