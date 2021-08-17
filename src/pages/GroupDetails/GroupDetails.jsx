import React, { Component } from 'react';
import * as groupService from "../../services/groupService"


class GroupDetails extends Component {

    state = {
        group: {}
    }

    async componentDidMount() {
        const group = await groupService.getGroupProfile(this.props.match.params.id)
        console.log('this.props.match', this.props.match)
        console.log('group', group)
        this.setState({group})
    }
    render () {
        console.log("Members", this.state.group?.members)
        return (
          <>
              <h1>Welcome to {this.state.group.name}!</h1>
              <h1>Members List:</h1>
              {this.state.group?.members?.map(members =>{
                return(<h1>{members.name}</h1>)
              })}
              <h1>{this.state.group?.name} Activities: </h1>
              {this.state.group?.activities?.map(activity=>{
        return(
        <p>{activity.name} </p>
        )
      })}
          </>
        );
    }
    
  }


export default GroupDetails;