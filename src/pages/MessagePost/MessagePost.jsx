import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import MessageForm from '../../components/MessageForm/MessageForm';
import EditMessageForm from '../../components/EditMessageForm/EditMessageForm'
import MessageCard from '../../components/MessageCard/MessageCard';

class MessagePost extends Component {
  state = { 

   }
  render() { 
    return ( 
      <>
        <h2>Messages Post:</h2>


        {this.props.messages?.map((message, idx) => 
           <>
           <MessageCard 
           message={message}
           handleDeleteMessage={this.props.handleDeleteMessage}
           />
         {/* <h3 key={idx}>{message.body}</h3>
           <button onClick={() => 
           (this.props.handleDeleteMessage(message._id))}>REMOVE</button>      */}
         </>
        )}
        <MessageForm
          handleAddMessage={this.props.handleAddMessage}
          handleDeleteMessage={this.props.handleDeleteMessage}
          handleUpdateMessage={this.props.handleUpdateMessage}
        />
        {/* <Route exact path='/edit' render={({location}) => 
          <EditMessageForm
            location={location}
          />
      } /> */}
    {/* <Link
        className='btn btn-sm btn-warning'
        to={{
            pathname: '/edit',
            state: {this.props.messages}
          }}
      >
        Edit
      </Link> */}
      
      </>
     );
  }
}
export default MessagePost;

