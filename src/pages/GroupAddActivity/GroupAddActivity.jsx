import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import styles from '../App/App.css'
import * as activityAPI from '../../services/activityService'

class GroupAddActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
      invalidForm: true,
      searchResults:{},
      group: undefined,
      formData: {
      name:'',
      type:'',
      participants: null,
      key: null,
      scheduledDate: null,
      //scheduledTime: Date,
    },

    }
  }
  formRef=React.createRef()

   

   handleChange= e=> {
    console.log('e.target1', e.target)
    const formData = {...this.state.formData, [e.target.name]: e.target.value}

    this.setState({
      formData: formData,
      invalidForm: !this.formRef.current.checkValidity()});
  }

  handleSearch = async (participants, type)=>{
    const searchResults = await activityAPI.search(participants, type)
    this.setState({formData: searchResults})
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSearch(this.state.formData.participants, this.state.formData.type)
  }

  handleGroupSubmit = (e) =>{
      e.preventDefault()
      if (this.state.group===undefined){
          alert("please select a group!")
      } else{
      this.props.handleAddGroupActivity(this.state.formData, this.state.group)
      this.props.history.push('/')
    }  
    
} 

//   handleSubmit2=(e)=>{
//     e.preventDefault()
//     let updatedForm = {...this.state.formData, key: e.target.key.value}
//     updatedForm = {...updatedForm, name: e.target.name.value}
//     updatedForm = {...updatedForm, type: e.target.type.value}
//     this.setState({
//       formData: updatedForm 
//     });
//     console.log('AFTER FORMDATA', this.state.formData)
//   }
  render() { 

    console.log("searchResult", this.state.searchResults)
    console.log("props", this.props)
    console.log('userProfile', this.props.userProfile)
    
    return ( 
      <>
      <main className='fs-6 m-5'>
      <h3>Add activity and join a group</h3>
      <form ref={this.formRef} onSubmit={this.handleSubmit}>
        <h3>What activity is your group interested in?</h3>
        <select 
          value={this.state.formData.type} 
          name="type"
          onChange={this.handleChange}
          required
          //default="social"
          >
          <option value="">Please select activity type</option>
          <option value="education">education</option>
          <option value="recreational">recreational</option>
          <option value="social">social</option>
          {/* <option value="diy">diy</option> */}
          <option value="cooking">cooking</option>
          <option value="relaxation">relaxation</option>
          {/* <option value="music">music</option> */}
          {/* <option value="busywork">busywork</option> */}
        </select>

        {/* <h3>Number of participants</h3> */}
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
 
        <button className="btn-sm btn-dark" type="submit" disabled={this.state.invalidForm}>
          Random Activity Search
        </button>
      </form>
      <h4>Search Results</h4>
      {console.log("this.state.formData.activity", this.state.formData.activity)}
      {this.state.formData.activity ? <div>{this.state.formData.activity}</div>: <p>No matching search results</p> }     
     
      <form ref={this.formRef} onSubmit={this.handleGroupSubmit}>
        
        <input 
          name="name"
          value={this.state.searchResults.activity}
          type="hidden"
        />

        {/* <input 
              name="scheduledDate"
              type="datetime-local"
              value={this.state.formData.scheduledDate}
              onChange={this.handleChange}
            /> */}
          <input
            name="type"
            value={this.state.searchResults.type}
            type="hidden"
          />
          <input
            name="key"
            value={this.state.searchResults.key}
            type="hidden"
          />
          
          <h4>What group are you?</h4>
          <select name="group" onChange={(evt)=>this.setState({[evt.target.name]: evt.target.value})}> {/* Need to figure out what to put as name here; should match with what we have in group model, feel like this should be group */}
            <option value="">select 1</option>
            {this.props.groups?.map(group=>
            <option value={group._id}>
                {group.name}
            </option>)}
              {/* <option value={this.props.groups[0].id}>{this.props.groups[0].name}</option> */}
          </select>
          <button className="btn-sm btn-dark">Enter</button>
      </form>
      {/* <button 
        type="submit"
        onClick={()=>this.props.handleAddGroupActivity(this.state.formData)}
        >
          Add Activity
      </button> */}

      {/* <h3>Your Activity:</h3>
      {this.props.userProfile?.activities?.map(activity=>
        <>
        <p>{activity.name} scheduled at {activity.scheduledDate} </p>  */}
        {/* <button 
        type="submit"
        onClick={()=>this.props.handleRemoveActivity(activity._id)}>
          DELETE
        </button> */}
        {/* <Link
              className='btn btn-sm btn-warning'
              to={{
              pathname: `/editActivity/${activity._id}`,
              state: {activity}
              }}
          >EDIT</Link> */}
        {/* </>
      )} */}

      </main>
      </>
     );
  }
}
 
export default GroupAddActivity;