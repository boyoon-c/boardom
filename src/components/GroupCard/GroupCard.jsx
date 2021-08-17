import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({  userProfile, group, handleJoin, handleLeaveGroup }) => {
  console.log('group', group)
  return (
    <>
      
      { !(group?._id === userProfile) && !(group?.members?.some(eachMember => eachMember._id === group.profile)) &&
            <div>
              <Link
        to={{
          pathname: `/group/${group.profile}`,
          state: {group}
        }}
      >
        <h1>{group.name}</h1>
      </Link>
              
              <button onClick={() => handleJoin(group.profile)}>Become a member of {group.name}!</button> 
           </div> 
           }
            

      { !(group?._id === userProfile) && (group?.members?.some(eachMember => eachMember._id === group.profile)) &&
      <div>
        <Link
        to={{
          pathname: `/group/${group.profile}`,
          state: {group}
        }}
      >
        <h1>{group.name}</h1>
      </Link>
      <button onClick={() => handleLeaveGroup(group.profile)}>Leave {group.name}.</button> 
      </div>
      }   
    </>
  );
}
 
export default GroupCard;