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
      <button onClick={() => handleAddFriend(user._id)}>Add friend {user.name}</button> 
      }
      { !(userProfile?._id === user._id) && (userProfile?.friends?.some(eachProfile => eachProfile._id === user._id)) &&
      <button onClick={() => handleRemoveFriend(user._id)}>Unfriend {user.name}</button> 
      }   
    </>
  );
}
 
export default UserCard;
