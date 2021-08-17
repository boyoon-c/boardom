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
        {this.props.messages?.map(message => 
         //return (
           <>
         <h3>{message.body}</h3>
         <h3>{message._id}
         {/* <button onClick={() => 
           (this.props.handleDeleteMessage(message._id))}>REMOVE</button> */}
           <button onClick={() => 
           (this.props.handleDeleteMessage(message._id))}>REMOVE</button>
           </h3>
         </>
         //)
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

// const MessagePost = ({messages, handleAddMessage, handleDeleteMessage, handleUpdateMessage}) => {
//   console.log("THis is the message post", messages)
//   return ( 
//     <>
//     <h1>{messages[0]?.body}</h1> 
//     <button onClick={() => 
//             handleDeleteMessage(messages[0]._id)}>
//               REMOVE
//     </button> 
//     {messages.map((msg, idx) =>{
//     return <div key={`msg_${idx}`}>
//                     {/* <h1>Iteration number {idx}</h1> */}
//                     <p>{msg.body}</p>
//                     <button onClick={() => handleDeleteMessage(msg._id)}>
//                         Button!
//                     </button>
//                 </div>
                
//     })
//               };
// </>
//   )
// }
 



// export default MessagePost;

