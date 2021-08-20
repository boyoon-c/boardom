import React, { Component } from 'react';
import { getAllUsers } from "../../services/userService"
import UserCard from '../../components/UserCard/UserCard'


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
        <h1
        style={{
          fontSize: 50,
          textAlign: 'center',
      }}
        >All available profiles</h1>
        {this.state.users.map(user => 
          <UserCard
            user={user}
            key={user._id}
            userProfile={this.props.userProfile}
            handleAddFriend={this.props.handleAddFriend}
            handleRemoveFriend={this.props.handleRemoveFriend}
          />
        )}
      </>
    );
  }
}

export default ProfileList;