import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ profile, userProfile, handleAddFriend, handleRemoveFriend }) => {
  return (
    <>
      <Link
        to={{
          pathname: '/profile',
          state: {profile}
        }}
      >
        <h4>{profile.name}</h4>
      </Link>
      { !(userProfile?._id === profile._id) && !(userProfile?.friends?.some(eachProfile => eachProfile._id === profile._id)) &&
      <button onClick={() => handleAddFriend(profile._id)}>Add friend {profile.name}</button> 
      }
      { !(userProfile?._id === profile._id) && (userProfile?.friends?.some(eachProfile => eachProfile._id === profile._id)) &&
      <button onClick={() => handleRemoveFriend(profile._id)}>Unfriend {profile.name}</button> 
      }   
    </>
  );
}
 
export default UserCard;
