import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from '../App/App.css'
import * as activityAPI from '../../services/activityService'

class AddActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
    invalidForm: true,
    formData: {
      name:'',
      type:'',
      participants: 1,
      key: null,
      scheduledDate: null,
      //scheduledTime: Date,
    },
    searchResults:{}
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
    this.setState({searchResults: searchResults})
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSearch(this.state.formData.participants, this.state.formData.type)
  }

  handleSubmit2=(e)=>{
    e.preventDefault()
    
    let updatedForm = {...this.state.formData, key: e.target.key.value}
    updatedForm = {...updatedForm, name: e.target.name.value}
    updatedForm = {...updatedForm, type: e.target.type.value}
    this.setState({
      formData: updatedForm 
    });
    this.props.history.push('/addActivity')
  }
  render() { 
   
    return ( 
      <>
      <main className=''>
        <div className="d-flex flex-column bd-highlight mb-3 justify-content-center text-center">
      <form ref={this.formRef} onSubmit={this.handleSubmit}>
        <div className="p-2 bd-highlight">
        <h3>Activity type</h3>
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
        </div>
        <button class="text-sm px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded" type="submit" disabled={this.state.invalidForm}>
          Random Activity Search
        </button>
      </form>


      <div className="fs-6 p-2 bd-highlight">
      <h3>Search Results</h3>
        <div>{this.state.searchResults.activity}</div>
      </div>
        </div>
      <form className="fs-6" ref={this.formRef} onSubmit={this.handleSubmit2}>
      <div className="fs-5 p-0 bd-highlight text-center">
        Choose Date!
      </div>
      <div className="p-2 bd-highlight text-center">

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
          </div>
          <div className="p-2 bd-highlight text-center">
          <button class="text-sm px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded">Enter</button>
          </div>
      </form>
      <div className="p-2 bd-highlight text-center">

      <button 
        type="submit"
        className="btn-sm btn-primary"
        onClick={()=>this.props.handleAddActivity(this.state.formData)}
        >
          Now add it to your collection!
      </button>
      </div>

      <div className="container-fluid full-width-div">
      <div className="row justify-content-md-center row-cols-sm-1 ">
      {this.props.userProfile?.activities?.map(activity=>
        <>
        <div className="col" align="center">
            <div className="card bg-light shadow-lg mb-3 mx-1" styleName="width:20em;height:40em; text-align: center">
              <div className="card-body">
              <div styleName="display: inline">
        <div class="text-sm">{activity.name} scheduled at {activity.scheduledDate} </div> 
        <button 
        class="text-xs px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
        type="submit"
        onClick={()=>this.props.handleRemoveActivity(activity._id)}>
          DELETE
        </button>
        <Link
              class="text-xs px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
              to={{
              pathname: `/editActivity/${activity._id}`,
              state: {activity}
              }}
          >EDIT</Link>
          </div>
          </div>
          </div>
          </div>
        </>
      )}
      </div>
      </div>

      {/* <h3>Your Activity:</h3>

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
 */}
      </main>
      </>
     );
  }
}
 
export default AddActivity;