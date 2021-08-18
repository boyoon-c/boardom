import React from 'react';
import { Link } from 'react-router-dom'

const MessageCard = ({message, handleDeleteMessage, idx}) => {
  return ( 
    <>
<h3 key={idx}>{message.body}</h3>
    <button onClick={() => 
      (handleDeleteMessage(message._id))}>
        REMOVE
    </button>   
       { <Link
          className='btn btn-sm btn-warning'
          to={{
            pathname: `/edit/${message._id}`, 
            state: {message}
          }}
        >
        Edit
        </Link> }  

    </>
   );
}
 
export default MessageCard;