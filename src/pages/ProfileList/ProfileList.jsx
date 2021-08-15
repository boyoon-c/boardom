import React, { Component } from 'react';
import { getAllUsers } from "../../services/userService"

class ProfileList extends Component {

state = {
    users: [],
  }

  async componentDidMount() {
    const users = await getAllUsers()
    this.setState({ users })
  }

  render() {
    return (
      <>
        <h1>Here is the Profile List</h1>
        {this.state.users.map((user) => (
          <p key={user._id}>{user.name} </p>
        ))}
      </>
    )
  }
}

export default ProfileList;