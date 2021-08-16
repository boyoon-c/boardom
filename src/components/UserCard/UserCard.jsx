import userEvent from '@testing-library/user-event';
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user, userProfile, handleAddFriend, handleRemoveFriend }) => {
  return (
    <>
      <Link
        to={{
          pathname: '/profile',
          state: {user}
        }}
      >
        <h4>{userEvent.name}</h4>
      </Link>
      { !(userProfile?._id === user._id) && !(userProfile?.friends?.some(eachProfile => eachProfile._id === user._id)) &&
      <button onClick={() => handleAddFriend(user.profile)}>Add friend {user.name} I changed user._id to user.profile</button>  
      }
      { !(userProfile?._id === user._id) && (userProfile?.friends?.some(eachProfile => eachProfile._id === user._id)) &&
      <button onClick={() => handleRemoveFriend(user.profile)}>Unfriend {user.name}</button> 
      }   
    </>
  );
}
 
export default UserCard;
