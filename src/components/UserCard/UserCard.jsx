import userEvent from '@testing-library/user-event';
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user, userProfile, handleAddFriend, handleRemoveFriend }) => {
  console.log('user', user)
  console.log('userProfile')
  return (
    <>
      <Link
        to={{
          pathname: `/profile/${user.profile}`,
          state: {user}
        }}
      >
        {/* <h4>{userEvent.name}</h4> */}
        <h1>{user.name}</h1>
      </Link>
      { !(userProfile?._id === user._id) && !(userProfile?.friends?.some(eachUser => eachUser._id === user._id)) &&
      <button onClick={() => handleAddFriend(user._id)}>Add  {user.name} to friends</button> 
      }
      { !(userProfile?._id === user._id) && (userProfile?.friends?.some(eachUser => eachUser._id === user._id)) &&
      <button onClick={() => handleRemoveFriend(user._id)}>Remove {user.name} from friends</button> 
      }   
    </>
  );
}
 
export default UserCard;
