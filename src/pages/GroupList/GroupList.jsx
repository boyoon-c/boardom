import React, { Component } from 'react';
import { getAllGroups } from "../../services/groupService"
import GroupCard from '../../components/GroupCard/GroupCard'


class GroupList extends Component {

  render() { 
    return (
      <>
      <div className="desc">
        <h1>All available groups</h1>
        </div>
        {this.props.groups.map(group => 
          <GroupCard
            group={group}
            key={group._id}
            handleJoin={this.props.handleJoin}
            handleLeaveGroup={this.props.handleLeaveGroup}
          />
        )}
       
      </>
    );
  }
}

export default GroupList;