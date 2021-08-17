import React, { Component } from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';

class MessagePost extends Component {
  state = { 

   }
  render() { 
    return ( 
      <>
        <h2>Messages</h2>
        <MessageForm />
      </>
     );
  }
}
 
export default MessagePost;