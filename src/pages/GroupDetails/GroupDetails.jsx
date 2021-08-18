import React, { Component } from 'react';
import * as groupService from "../../services/groupService"

class GroupDetails extends Component {
    constructor(props) {
      super(props)
    this.state = {
      group: this.props.location.state.group
    }
}
    async componentDidMount() {
        const group = await groupService.getGroupProfile(this.state.group._id)
        console.log('this.props.match', this.props.match)
        console.log('group', group)
        this.setState({group})
    }
    
    render () {
        console.log("Members", this.state.group?.members)
        return (
          <>
              <h1>Welcome to {this.state.group?.name}!</h1>
              <h1>{this.state.group?.name}s' members List:</h1>
              {this.state.group?.members?.map(members =>{
                return(<h1>{members.name}</h1>)
              })}
              <h1>{this.state.group?.name}'s Activities: </h1>
              {this.state.group?.activities?.map(activity=>{
        return(
        <p>{activity.name} </p>
        )
      })}
      <h1>{this.state.group?.name}'s Description:</h1>
      {/* {this.state.group?.description?.map(description=>{
        return(
        <p>{group.description} </p>
        )
      })} */}
          </>
        );
    }
    
  }


export default GroupDetails;