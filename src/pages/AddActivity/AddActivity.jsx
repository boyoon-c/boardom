import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from '../App/App.css'
import * as activityAPI from '../../services/activityService'

class AddActivity extends Component {
  // state = { 
  //   invalidForm: true,
  //   formData: {
  //     name:'',
  //     type:'',
  //     participants: Number,
  //     activityNo: String,
  //     scheduledDate: Date,
  //     scheduledTime: Date,
  //   },
  //   searchResults:{},
  //  }
  constructor(props){
    super(props)
    this.state = {
          invalidForm: true,
    formData: {
      name:'',
      type:'',
      participants: Number,
      key: String,
      scheduledDate: Date,
      //scheduledTime: Date,
    },
    searchResults:{},

    }
    //this.handleChange=this.handleChange.bind(this)
    //this.handleSubmit=this.handleSubmit.bind(this)
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
    this.setState({searchResults: searchResults})
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSearch(this.state.formData.participants, this.state.formData.type)
  }

  handleSubmit2=(e)=>{
    e.preventDefault()
    // console.log('e.target2', e.target)
    // console.log('e.target.object', {[e.target.name]:e.target.value})
    // console.log('e.target.name',[e.target.type])
    // console.log('e.target.name.value',e.target.name.value)
    // console.log('e.target.value',e.target.value)
    // console.log("BEFORE FORMDATA", this.state.formData)
    // this.setState({
    //   formData.name: e.target.name.value
    // })
    // this.state.formData.name = e.target.name.value
    // const formData = {...this.state.formData, [e.target.name]: e.target.value}
    let updatedForm = {...this.state.formData, key: e.target.key.value}
    updatedForm = {...updatedForm, name: e.target.name.value}
    updatedForm = {...updatedForm, type: e.target.type.value}
    this.setState({
      formData: updatedForm 
    });
    console.log('AFTER FORMDATA', this.state.formData)
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
          Random Activity Search
        </button>
      </form>
      <h3>Search Results</h3>
        <div>{this.state.searchResults.activity}</div>
     
     
      <form ref={this.formRef} onSubmit={this.handleSubmit2}>
        
        <input 
          name="name"
          value={this.state.searchResults.activity}
          type="hidden"
        />

        <input 
              name="scheduledDate"
              type="datetime-local"
              value={this.state.formData.scheduledDate}
              onChange={this.handleChange}
            />
          {/* <input 
            name="scheduledTime"
            value={this.state.formData.scheduledTime}
            type="time"
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
          <button>Enter</button>
      </form>
      {/* {console.log("BEFORE CLICKING ADD ACTIVITY", this.state.formData)} */}
      
      <button 
        type="submit"
        //onClick={()=>this.props.handleAddActivity(this.state.searchResults)}
        onClick={()=>this.props.handleAddActivity(this.state.formData)}
        >
          Add Activity
      </button>

      <h3>Your Activity:</h3>
      {this.props.userProfile?.activities?.map(activity=>
        <>
        <p>{activity.name} scheduled at {activity.scheduledDate} </p> 
        <button 
        type="submit"
        onClick={()=>this.props.handleRemoveActivity(activity._id)}>
          DELETE
        </button>
        <Link
              className='btn btn-sm btn-warning'
              to={{
              pathname: `/editActivity/${activity._id}`,
              state: {activity}
              }}
          >EDIT</Link>
        </>
      )}

      </main>
      </>
     );
  }
}
 
export default AddActivity;