import React from 'react';
import { Link } from 'react-router-dom'

const MessageCard = ({message, handleDeleteMessage, idx, userProfile}) => {
  return ( 
    

<>
    <h3 key={idx}>{message.body}</h3>
    <h3 key={idx}>{message.author?.name}</h3>  
      { (userProfile?._id === message.author._id) && 
            <div>
    
    <button onClick={() => handleDeleteMessage(message._id)}>REMOVE</button>   
    { <Link
       className='btn btn-sm btn-warning'
       to={{
         pathname: `/edit/${message._id}`, 
         state: {message}
       }}
     >
     Edit
     </Link> }  
     </div> 
}

    </>
);
}
 
export default MessageCard;
