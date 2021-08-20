import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import MessageForm from '../../components/MessageForm/MessageForm';
import EditMessageForm from '../../components/EditMessageForm/EditMessageForm'
import MessageCard from '../../components/MessageCard/MessageCard';

class MessagePost extends Component {
  // state = { 

  //  }
  
  render() { 
    return ( 
      <>
        <h2>Messages Post:</h2>

        {this.props.messages?.map((message, idx) => 
           <div class="mb-3">
           <MessageCard 
           userProfile={this.props.userProfile}
           message={message}
           handleDeleteMessage={this.props.handleDeleteMessage}
           />
           </div>
         
        )}
        <MessageForm
          userProfile={this.props.userProfile}
          handleAddMessage={this.props.handleAddMessage}
          handleDeleteMessage={this.props.handleDeleteMessage}
          handleUpdateMessage={this.props.handleUpdateMessage}
        />
      </>
     );
  }
}
export default MessagePost;

