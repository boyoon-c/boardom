import React, { Component } from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';

class MessagePost extends Component {
  state = { 

   }
  render() { 
    return ( 
      <>
        {console.log(this.props.messages)}
        <h2>Messages</h2>
        {this.props.messages?.map((message, idx) => 
           <>
         <h3 key={idx}>{message.body}</h3>
           <button onClick={() => 
           (this.props.handleDeleteMessage(message._id))}>REMOVE</button>     
         </>
        )}
        <MessageForm
          handleAddMessage={this.props.handleAddMessage}
          handleDeleteMessage={this.props.handleDeleteMessage}
          handleUpdateMessage={this.props.handleUpdateMessage}
        />
      </>
     );
  }
}
export default MessagePost;

