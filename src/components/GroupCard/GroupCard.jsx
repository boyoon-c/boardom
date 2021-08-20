import React from 'react'
import { Link } from 'react-router-dom'


const GroupCard = ({  userProfile, group, handleJoin, handleLeaveGroup }) => {
  return (
    <>
    <div class="flex ml-32 mr-32 mb-2 py-2 px-4 items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
           <Link to={{
             pathname: `/group/${group._id}`,
             state: {group}
             }}>
        <img alt="random pic" class="w-45 rounded-md border-2 border-gray-300" src="https://picsum.photos/200" />
           </Link>
         <div id="body" class="flex flex-col ml-5">
      { !(group?._id === userProfile) && !(group?.members?.some(eachMember => eachMember._id === group._id)) &&
       <div>
             <Link to={{
             pathname: `/group/${group._id}`,
             state: {group}
             }}>
                <h1>{group.name}</h1>
            </Link>
            <Link to={{
              pathname: `/group/${group._id}`,
              state: {group}
              }}>   
          <button 
              class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded" 
              onClick={() => handleJoin(group._id)}>
            Become a member of {group.name}!
          </button> 
        </Link>
      </div> 
      }
            
      { !(group?._id === userProfile) && (group?.members?.some(eachMember => eachMember._id === group._id)) &&
        <div>
            <Link to={{
              pathname: `/leaveGroup/${group._id}`,
              state: {group}
            }}>
            <h1>{group.name}</h1>
          </Link>
          <button 
              class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded" 
              onClick={() => handleLeaveGroup(group._id)}>
            Leave {group.name}.
            </button> 
        </div>
      }          
         </div>
    </div>
 
    </>
  );
}
 
export default GroupCard;

