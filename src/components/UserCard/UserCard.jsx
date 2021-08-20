import userEvent from '@testing-library/user-event';
import React from 'react'
import { Link } from 'react-router-dom'
//import '../../pages/ProfileDetails/ProfileDetails.css'

const UserCard = ({ user, userProfile, handleAddFriend, handleRemoveFriend }) => {
  console.log('user', user)
  console.log('userProfile', userProfile)
  return (
    <>
  
    <div class="flex w-72 mb-2 py-2 px-4 items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
      <div id="body" class="flex flex-col ml-5">
      { !(userProfile?._id === user.profile) && !(userProfile?.friends?.some(eachUser => eachUser._id === user.profile)) &&
            <>
              <Link
                to={{
                  pathname: `/profile/${user.profile}`,
                  state: {user}
                }}
              >
                <img alt="random pic" class="w-45 rounded-md border-2 border-gray-300" src="https://picsum.photos/200" />
           
                <h1>{user.name}</h1>
              </Link>
              <button 
                  class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded" 
                  onClick={() => handleAddFriend(user.profile)}>
               Add  {user.name} to friends
              </button> 
              
           </> 
           }
      { !(userProfile?._id === user.profile) && (userProfile?.friends?.some(eachUser => eachUser._id === user.profile)) &&
          <>
            <Link
            to={{
              pathname: `/profile/${user.profile}`,
              state: {user
              }}}>
              <img alt="random pic" class="w-45 rounded-md border-2 border-gray-300" src="https://picsum.photos/200" />
             <h1>{user.name}</h1>
             </Link>
            <button 
              class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded" 
              onClick={() => handleRemoveFriend(user.profile)}>
                Remove {user.name} from friends
            </button> 
          </>
        }   
        </div>
      </div>
   
    </>

  );
}
 
export default UserCard;

