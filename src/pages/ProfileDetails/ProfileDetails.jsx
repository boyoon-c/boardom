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
        console.log(this.props.match.params.id)
        const profile = await profileService.getDetails(this.props.match.params.id)
       console.log(profile)
        this.setState(profile)
    }
    render () {

        return (
          <>

          </>
        );
    }
  }


export default ProfileDetails;