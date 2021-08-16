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
    //console.log(searchResults)
    this.setState({searchResults: searchResults})
  }

  handleSubmit = e => {
    e.preventDefault()
    //this.props.handleAddActivity(this.state.formData)
    this.handleSearch(this.state.formData.participants, this.state.formData.type)
  }

  
  // async componentDidMount(){
  //   const searchResults = await activityAPI.search(this.state.formData.participants, this.state.formData.type)
  //   this.setState({
  //     searchResults: searchResults
  //   })
  // }

  render() { 
    console.log("searchResult", this.state.searchResults)
    return ( 
      <>
      <main className='fs-6 m-5'>
      <h2>Add activity</h2>
      <form ref={this.formRef} onSubmit={this.handleSubmit}>
        <h3>Activity type:</h3>
        <input
        type="text"
        name="type"
        value={this.state.formData.type}
        onChange={this.handleChange}
        required
        />
        <h3>Number of participants</h3>
        <input
        type="text"
        name="participants"
        value={this.state.formData.participants}
        onChange={this.handleChange}
        required
        />
        {/* <select 
          value={this.formData.type} 
          onChange={this.handleChange}
          required
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
        value={this.formData.participants}
        onChange={this.handleChange}
        required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select><br /> */}
        {/* <button 
        type="submit"
        disabled={this.state.invalidForm}
        >
          Add Activity
        </button> */}
        <button type="submit" disabled={this.state.invalidForm}>
          Next Activity this will call another activity
        </button>  
      </form>
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