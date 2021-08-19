import React, { Component } from 'react';
import UserCard from '../../components/UserCard/UserCard'
import { friend, getUserProfile } from "../../services/userService"
import * as profileService from "../../services/profileService"


class ProfileDetails extends Component {

    state = {
        profile: {},
        formData:{
            //profile: '',
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
      <h1>{this.state.profile?.name}'s Profile</h1>
      <h1>Friends List:</h1>
      {this.state.profile?.friends?.map(friend =>{
        return(<h1>{friend.name}</h1>)
      })}
      <h1>{this.state.profile?.name}'s Solo Activities: </h1>
      
      <ul>
      {this.state.profile?.activities?.map(activity=>{
        return(
          <>
          <li>{activity.name}
            <button 
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

      <h1>{this.state.profile.name}'s Group Activities: </h1>
              {this.state.profile.groups?.map(group=>{ 
                return(
                  <>
                  <h1>{group.name}</h1>
                  <ul> 
                  {group.activities?.map(activity => 
                    <li>{activity.name}</li>
                    )}
                    </ul>
                  <button
                  type="submit"
                  onClick={() =>this.props.handleLeaveGroup(group._id)}>Leave {group.name}
                  </button>
                  </>
                )
              })}
        </>
      )
    
}
}

export default ProfileDetails;
