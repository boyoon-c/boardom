import React from 'react';
import { Link } from 'react-router-dom'

const MessageCard = ({message, handleDeleteMessage, idx, userProfile}) => {
  return ( 

<>
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
   <div class="md:flex">
       <div class="md:flex-shrink-0">
            <img class="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=448&q=80" alt="A cat"/>
        </div>
      <div class="p-8">
        <h3 key={idx}>{message.body}</h3>
        <h6 key={idx}>Written by:  {message.author?.name}</h6>  
        { (userProfile?._id === message.author._id) && 
      <div>
    
    <button className="btn-sm btn-danger" onClick={() => handleDeleteMessage(message._id)}>REMOVE</button>   
     <Link
       to={{
         pathname: `/edit/${message._id}`, 
         state: {message}
       }}
     >
       <button className="btn-sm btn-warning">
     Edit
     </button>
     </Link>   
     
     </div> 
}
      </div>
    </div>             
  </div>
    </>
);
}
 
export default MessageCard;
