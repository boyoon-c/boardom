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
        {this.props.messages.map(message => {
         return (<h3>{message.body}</h3>)
        })}
        <MessageForm
          handleAddMessage={this.props.handleAddMessage}
        />
      </>
     );
  }
}
 
export default MessagePost;