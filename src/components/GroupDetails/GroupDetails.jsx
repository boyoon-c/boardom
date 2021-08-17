import React, { Component } from 'react';
import * as groupService from "../../services/groupService"


class GroupDetails extends Component {

    state = {
        profile: {}
    }

    async componentDidMount() {
        //console.log("this.props.match", this.props.match)
        const profile = await groupService.getDetails(this.props.match.params.id)
        console.log('this.props.match', this.props.match)
        console.log('profile', profile)
        this.setState({profile})
    }
    render () {
        console.log("Profile", this.state.profile)
        console.log("My Friends", this.state.profile?.friends)
        return (
          <>
              <h1>{this.state.profile?.name}'s Profile</h1>
              <h1>Friends List:</h1>
              {this.state.profile?.friends?.map(friend =>{
                return(<h1>{friend.name}</h1>)
              })}
              <h1>{this.state.profile?.name}'s Activities: </h1>
              {this.state.profile?.activities?.map(activity=>{
        return(
        <p>{activity.name} </p>
        )
      })}
          </>
        );
    }
    
  }


export default GroupDetails;