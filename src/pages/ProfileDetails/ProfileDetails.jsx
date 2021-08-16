import React, { Component } from 'react';
import UserCard from '../../components/UserCard/UserCard'
import { getUserProfile } from "../../services/userService"
import * as profileService from "../../services/profileService"


// class ProfileDetails extends Component {
//     state = {
//         user: [],
//       }
    
//       async componentDidMount() {
//         const user = await getUserProfile()
//         this.setState({ user })
//       }
    
//       render() { 
//         return (
//           <>
//             <h1>profile</h1>
//             {this.state.user.map(user => 
//               <UserCard
//                 user={user}
//                 key={user._id}
//                 userProfile={this.props.userProfile}
//                 handleAddFriend={this.props.handleAddFriend}
//                 handleRemoveFriend={this.props.handleRemoveFriend}
//               />
//             )}
//           </>
//         );
//       }
//     }
    
class ProfileDetails extends Component {

    state = {
        profile: {}
    }

    async componentDidMount() {
        //console.log("this.props.match", this.props.match)
        const profile = await profileService.getDetails(this.props.match.params.id)
        //console.log('profile', profile)
        this.setState({profile})
    }
    render () {
        console.log("Profile", this.state.profile)
        console.log("My Friends", this.state.profile?.friends)
        return (
          <>
              {this.props.match.params.id}
              <h1>profile id: {this.state.profile?.name}</h1>
              {this.state.profile?.friends?.map(friend =>{
                return(<h1>{friend.name}</h1>)
              })}
              {/* <h3>{this.state.profile?.friends[0]?.name}</h3> */}
          </>
        );
    }
  }


export default ProfileDetails;