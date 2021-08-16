import userEvent from '@testing-library/user-event';
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user, userProfile, handleAddFriend, handleRemoveFriend }) => {
  console.log('user', user)
  console.log('userProfile', userProfile)
  return (
    <>
      
      { !(userProfile?._id === user.profile) && !(userProfile?.friends?.some(eachUser => eachUser._id === user.profile)) &&
            <div>
              <Link
        to={{
          pathname: `/profile/${user.profile}`,
          state: {user}
        }}
      >
        <h1>{user.name}</h1>
      </Link>
              
              <button onClick={() => handleAddFriend(user.profile)}>Add  {user.name} to friends</button> 
           </div> 
           }
            

      { !(userProfile?._id === user.profile) && (userProfile?.friends?.some(eachUser => eachUser._id === user.profile)) &&
      <div>
        <Link
        to={{
          pathname: `/profile/${user.profile}`,
          state: {user}
        }}
      >
        <h1>{user.name}</h1>
      </Link>
      <button onClick={() => handleRemoveFriend(user.profile)}>Remove {user.name} from friends</button> 
      </div>
      }   
    </>
  );
}
 
export default UserCard;

