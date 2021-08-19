import React, { Component } from 'react';
import * as groupService from "../../services/groupService"
import { Link } from "react-router-dom"

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
              {/* <h1>{this.state.group?.name}'s Description:</h1> */}
              <br></br>
              <h3>"{this.state.group.description}"</h3>
              <br></br>
              <h1>{this.state.group?.name}s' members List:</h1>
              {this.state.group?.members?.map(members =>{
                return(<h1>{members.name}</h1>)
              })}
              <h1>{this.state.group?.name}'s Activities: </h1>
              {this.state.group?.activities?.map(activity=>{
        return(
          <>
        <p>Name: "{activity.name}", Type: "{activity.type}" </p>
        <Link
        to={{
          
          pathname: `/group/${this.state.group._id}`,
          // state: {this.state.group}
        }}
        
        >
        <button onClick={this.props.handleJoinGroupActivity}>Join</button>
        
        
        </Link>
</>
        )
      })}
          </>
        );
    }
    
  }


export default GroupDetails;