import React, { Component } from 'react';
import styles from '../App/App.css'
import * as activityAPI from '../../services/activityService'

class AddActivity extends Component {
  state = { 
    invalidForm: true,
    formData: {
      //name:'',
      type:'',
      participants: ''
    },
    searchResults:{}
   }

   formRef=React.createRef()

   

   handleChange= e=> {
   const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({
      formData: formData,
      invalidForm: !this.formRef.current.checkValidity()});
  }

  handleSearch = async (participants, type)=>{
    const searchResults = await activityAPI.search(participants, type)
    this.setState({searchResults: searchResults})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.handleSearch(this.state.formData.participants, this.state.formData.type)
  }

  
  render() { 
    console.log("searchResult", this.state.searchResults)
    return ( 
      <>
      <main className='fs-6 m-5'>
      <h2>Add activity</h2>
      <form ref={this.formRef} onSubmit={this.handleSubmit}>
        <h3>Activity type:</h3>
        <select 
          value={this.state.formData.type} 
          name="type"
          onChange={this.handleChange}
          required
          >
          <option>education</option>
          <option>recreational</option>
          <option>social</option>
          <option>diy</option>
          <option>cooking</option>
          <option>relaxation</option>
          <option>music</option>
          <option>busywork</option>
        </select>

        <h3>Number of participants</h3>
        <select
        name="participants"
        value={this.state.formData.participants}
        onChange={this.handleChange}
        required
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select><br />
        <button type="submit" disabled={this.state.invalidForm}>
          Next Activity this will call another activity
        </button>
      </form>
      <button 
        type="submit"
        disabled={this.state.invalidForm}
        >
          Add Activity
      </button>
      <h3>Search Results</h3>
        <div>{this.state.searchResults.activity}</div>
      <h3>Your Activity:</h3>
      {/* Here we will display the list of a user's activities in cards */}
      </main>
      </>
     );
  }
}
 
export default AddActivity;