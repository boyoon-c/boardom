import React, { Component } from 'react';

class AddActivity extends Component {
  state = { 
    invalidForm: true,
    formData:{
      name:'',
      type:'',
      participants: 0
    }
   }

   formRef=React.createRef()

   handleSubmit = e => {
     e.preventDefault()
     this.props.handleAddActivity(this.state.formData)
   }

   handleChange(e) {
   const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()});
  }

  render() { 
    return ( 
      <>
      <h2>add activity</h2>
      <form ref={this.formRef} onSubmit={this.handleSubmit}>
        <h3>Activity type:</h3>
        <select 
          value={this.state.type} 
          onChange={this.handleChange}
          >
          <option value="education">education</option>
          <option value="recreational">recreational</option>
          <option value="social">social</option>
          <option value="diy">diy</option>
          <option value="cooking">cooking</option>
          <option value="relaxation">relaxation</option>
          <option value="music">music</option>
          <option value="busywork">busywork</option>
        </select>
        <h3>Number of Participants:</h3>
        <select
        value={this.state.participants}
        onChange={this.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
        type="submit"
        disabled={this.state.invalidForm}
        >
          Add Activity
        </button>

        <button>Next Activity this will call another activity</button>  
      </form>
      <h2>Your Activity:</h2>
      {}
      </>
     );
  }
}
 
export default AddActivity;