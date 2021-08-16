import React, { Component } from 'react';
import styles from '../App/App.css'
import * as activityAPI from '../../services/activityService'

class AddActivity extends Component {
  state = { 
    invalidForm: true,
    formData: {
      name:'',
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
    console.log("props", this.props)
    console.log('userProfile', this.props.userProfile)
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
          default="social"
          >
          <option value="">Please select type</option>
          <option value="education">education</option>
          <option value="recreational">recreational</option>
          <option value="social">social</option>
          <option value="diy">diy</option>
          <option value="cooking">cooking</option>
          <option value="relaxation">relaxation</option>
          <option value="music">music</option>
          <option value="busywork">busywork</option>
        </select>

        <h3>Number of participants</h3>
        <select
        name="participants"
        value={this.state.formData.participants}
        onChange={this.handleChange}
        required
        >
          <option value="">Select number of participants</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select><br />
        <button type="submit" disabled={this.state.invalidForm}>
          Next Activity this will call another activity
        </button>
      </form>
      <h3>Search Results</h3>
        <div>{this.state.searchResults.activity}</div>
      <button 
        type="submit"
        onClick={()=>this.props.handleAddActivity(this.state.searchResults)}
        >
          Add Activity
      </button>

      <h3>Your Activity:</h3>
      {this.props.userProfile?.activities?.map(activity=>{
        return(
        <p>{activity} 
        {/* <button 
        type="submit"
        onClick={()=>this.props.handleRemoveActivity(this.state.searchResults)}>
          DELETE
        </button>
        */}
        </p> 
        
        )
      })}
      {/* Here we will display the list of a user's activities in cards */}
      </main>
      </>
     );
  }
}
 
export default AddActivity;