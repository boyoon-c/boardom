import React, { Component } from 'react';
import { getAllUsers } from "../../services/userService"
import UserCard from '../../components/UserCard/UserCard'


class ProfileList extends Component {

state = {
    users: [],
    // filteredUsers: []
  }

  async componentDidMount() {
    const users = await getAllUsers()
    const filteredUsers = (users.filter(user => user.profile !== this.props.userProfile._id))
    this.setState({ users: filteredUsers })
  }

  
  render() { 
    return (
      <>
        <h1>All available profiles</h1>
        <section class="container px-6 py-4 mx-auto">
          <div class="grid gap-6 mb-8 md:grid-cols-1 lg:grid-cols-3">
        {this.state.users.map(user => 
          <UserCard
            user={user}
            key={user._id}
            userProfile={this.props.userProfile}
            handleAddFriend={this.props.handleAddFriend}
            handleRemoveFriend={this.props.handleRemoveFriend}
          />
        )}
        </div>
</section>

      </>
    );
  }
}

export default ProfileList;