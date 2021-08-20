import React, { Component } from 'react';
import UserCard from '../../components/UserCard/UserCard'
import { friend, getUserProfile } from "../../services/userService"
import * as profileService from "../../services/profileService"
import block1 from '../../images/block1.png';
import "./ProfileDetails.css"


class ProfileDetails extends Component {

    state = {
        profile: {},
        formData:{
            activityId: '',
            date: '',
            time: ''
        }
    }

  handleSubmit = e=>{
    e.preventDefault()
    this.handleUpdate()
  }

  handleChange= e=> {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
      this.setState({
        formData: formData,
    })
    console.log('formData', formData)
  }
    
  async componentDidMount() {
    const profile = await profileService.getDetails(this.props.match.params.id)
    this.setState({profile})
  }
  render () {
    return (
          <>
          
      <h1
        style={{
          fontSize: 50,
          textAlign: 'center',
      }}
      >{this.state.profile?.name}'s Profile!</h1>
                      <div class="center-image">
                      <img 
                style={{
                    height: 300,
                    width: 300,
                    borderRadius: 200,
                    borderWidth: 5,
                    borderColor: 'black',
                    backgroundColor: '#7cebdc'
                  }}
                src={block1} alt="block" class="block"/> 
</div>
         <br></br> 
      <h1>Friends List:</h1>
      <br></br>
      <div class=" mx-auto bg-white rounded-xl shadow-lg align overflow-hidden md:box-content">

      {this.state.profile?.friends?.map(friend =>{
        return(<h1>{friend.name}</h1>)
      })}
      <br></br>
      </div>
      <h1>{this.state.profile?.name}'s Solo Activities: </h1>
      <br></br>
      <div class=" mx-auto bg-white rounded-xl shadow-lg align overflow-hidden md:box-content">
      <ul>
      {this.state.profile?.activities?.map(activity=>{
        <br></br>
        return(
          <>
          <li>{activity.name}
            <button class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
              type="submit"
              onClick={()=>this.props.handleRemoveActivity(activity._id)}
            >
                DELETE
            </button>
          </li>
          </>
        )
      })}
      </ul>
      </div>

      <h1>{this.state.profile.name}'s Group Activities: </h1>
      <div class=" mx-auto bg-white rounded-xl shadow-lg align overflow-hidden md:box-content">
              {this.state.profile.groups?.map(group=>{ 
                return(
                  <>
                  <h1>{group.name}</h1>
                  <ul> 
                    <br></br>
                  {group.activities?.map(activity => 
                    <li>{activity.name}</li>
                    )}
                    </ul>
                  <button class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
                  type="submit"
                  onClick={() =>this.props.handleLeaveGroup(group._id)}>Leave {group.name}
                  </button>
                  </>
                )
              })}
             </div> 
        </>
      )
    
}
}

export default ProfileDetails;
