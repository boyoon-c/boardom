import React from 'react';
import { Link } from 'react-router-dom'

const MessageCard = ({message, handleDeleteMessage, idx}) => {
  return ( 
    <>
<h3>message card</h3>
<h3 key={idx}>{message.body}</h3>
           <button onClick={() => 
           (handleDeleteMessage(message._id))}>REMOVE</button>     

    </>
   );
}
 
export default MessageCard;