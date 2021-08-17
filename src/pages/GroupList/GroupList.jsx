import React, { Component } from 'react';
import { getAllGroups } from "../../services/groupService"
import GroupCard from '../../components/GroupCard/GroupCard'


class GroupList extends Component {

// state = {
//     groups: [],
//   }

//   async componentDidMount() {
//     const groups = await getAllGroups()
//     this.setState({ groups })
//   }

  render() { 
    return (
      <>
        <h1>All available groups</h1>
        {this.props.groups.map(group => 
          <GroupCard
            group={group}
            key={group._id}
            // groups={this.props.groups}
            handleJoin={this.props.handleJoin}
            handleLeaveGroup={this.props.handleLeaveGroup}
          />
        )}
      </>
    );
  }
}

export default GroupList;