import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({  group, handleJoin, handleLeaveGroup }) => {
  console.log('group', group)
  return (
    <>
      
      { !(group?._id === group.profile) && !(group?.group?.some(eachUser => eachUser._id === group.profile)) &&
            <div>
              <Link
        to={{
          pathname: `/group/${group.profile}`,
          state: {group}
        }}
      >
        <h1>{group.name}</h1>
      </Link>
              
              <button onClick={() => handleJoin(group.profile)}>Add {group.name} to group</button> 
           </div> 
           }
            

      { !(group?._id === group.profile) && (group?.group?.some(eachUser => eachUser._id === group.profile)) &&
      <div>
        <Link
        to={{
          pathname: `/group/${group.profile}`,
          state: {group}
        }}
      >
        <h1>{group.name}</h1>
      </Link>
      <button onClick={() => handleLeaveGroup(group.profile)}>Remove {group.name} from group</button> 
      </div>
      }   
    </>
  );
}
 
export default GroupCard;