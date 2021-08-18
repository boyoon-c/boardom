import React, { Component } from 'react';
import { getAllGroups } from "../../services/groupService"
import GroupCard from '../../components/GroupCard/GroupCard'


class GroupList extends Component {

  // state = {
  //   group: [],
  // }

  // async componentDidMount() {
  //   const groups = await getAllGroups()
  //   this.setState({ groups })
  // }

  render() { 
    return (
      <>
        <h1>All available groups</h1>
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

// import React, { Component } from 'react';
// import { getAllGroups } from "../../services/groupService"
// import GroupCard from '../../components/GroupCard/GroupCard'
// import GroupDetails from '../GroupDetails/GroupDetails';


// class GroupList extends Component {


//   render() { 
//     return (
//       <>
//         <h1>All available groups</h1>
//         {this.props.groups.map(group => 
//         <>
//           <GroupCard
//             group={group}
//             key={group._id}
//             handleJoin={this.props.handleJoin}
//             handleLeaveGroup={this.props.handleLeaveGroup}
//           />
//           <GroupDetails
//           group={group}
//             key={group._id}
//             handleJoin={this.props.handleJoin}
//             handleLeaveGroup={this.props.handleLeaveGroup}
//             />
//             </>
//         )}
//       </>
//     );
//   }
// }

// export default GroupList;