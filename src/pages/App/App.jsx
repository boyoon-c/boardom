import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './App.css'
import Users from '../Users/Users'
import NavBar from '../../components/NavBar/NavBar'
import About from '../About/About'
import AddActivity from '../AddActivity/AddActivity'
import GroupAddActivity from '../GroupAddActivity/GroupAddActivity'
//import Calendar from '../Calendar/Calendar'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Group from '../Group/Group'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import GroupDetails from '../GroupDetails/GroupDetails'
import ProfileList from '../ProfileList/ProfileList'
import GroupList from '../GroupList/GroupList'
import Signup from '../Signup/Signup'
import MessagePost from '../MessagePost/MessagePost'
import EditMessageForm from '../../components/EditMessageForm/EditMessageForm'
import EditActivityForm from '../../components/EditActivityForm/EditActivityForm'
import * as authService from '../../services/authService'
import * as userAPI from '../../services/userService'
import * as activityAPI from '../../services/activityService'
import * as groupAPI from '../../services/groupService'
import * as profileAPI from '../../services/profileService'
import * as messageAPI from '../../services/messagePostService'


class App extends Component {
	state = {
		user: authService.getUser(),
		userProfile: null,
		groups: [],
		messages: [],
		activities:{}
	}

	renderEventContent = () => {
		return (
		  <>
			<b>event</b>
			<i>{this.state.title}</i>
		  </>
		)
	  }

	handleLogout = () => {
		authService.logout()
		this.setState({ user: null })
		this.props.history.push('/')
	}

	handleSignupOrLogin = () => {
		this.setState({ user: authService.getUser() })
	}

	handleCreateGroup = async newGroupData => {
		const newGroup = await groupAPI.createGroup(newGroupData)
		console.log("handleCreateGroup new group", newGroup)
		this.setState ({ userProfile: newGroup })
		this.handleGetAllGroups()
		this.props.history.push('/grouplist')
		
	}

	handleAddFriend = async friendId => {
		const updatedProfile = await profileAPI.friend(friendId)
		console.log(updatedProfile)
		this.setState({ userProfile: updatedProfile })
	}

	handleRemoveFriend = async friendId => {
		const updatedProfile = await profileAPI.unfriend(friendId)
		this.setState({ userProfile: updatedProfile })
	}
	
	handleGetAllGroups = async () => {
		const groups = await groupAPI.getAllGroups()
		this.setState({ groups: groups })
	}
	
	
	handleJoin = async groupId => {
		const updatedGroup = await groupAPI.join(groupId)
		console.log(updatedGroup)
	} 
	

	
	handleLeaveGroup = async groupId => {
		const updatedGroup = await groupAPI.leave(groupId)
		console.log('updatedGroup', updatedGroup)
		const newGroups=[...this.state.groups]
		const leaveGroup = (element) => element._id === groupId
		const leaveGroupIdx = newGroups.findIndex(leaveGroup)
		newGroups.splice(leaveGroupIdx,1)
		this.setState({
			groups: newGroups
		})
	}
	
	handleAddActivity = async activity =>{
		console.log('this.state.formData', activity)
		const updatedProfile = await activityAPI.addActivity(activity)
		this.setState({userProfile: updatedProfile})
	} 
	handleAddGroupActivity = async (activity, groupId) =>{
		console.log('handlegroupactivity', activity)
		const updatedGroup = await groupAPI.addActivity(activity, groupId)
		const groups = this.state.groups
		groups.filter((group)=>group._id!==updatedGroup._id)
		groups.push(updatedGroup)
		this.setState({groups: groups})
		this.props.history.push('/')
	} 
	
	handleRemoveActivity = async activity =>{
		const updatedProfile = await activityAPI.removeActivity(activity)
		this.setState({userProfile:updatedProfile})
	}
	
	handleGetAllMessages = async () => {
		const messages = await messageAPI.getAllMessages()
		this.setState({ messages: messages })
	}
	
	handleAddMessage = async message => {
		console.log(this.state.messages)
		const newMessage = await messageAPI.createMessagePost(message)
		this.setState(state => ({
			messages: [...state.messages, newMessage]
		})
	)}

	handleDeleteMessage = async messageId => {
		const updatedMessages = await messageAPI.deleteMessagePost(messageId)
		const newMessages=[...this.state.messages]
		const deleteMessage = (element) => element._id === messageId
		const deleteMessageIdx = newMessages.findIndex(deleteMessage)
		newMessages.splice(deleteMessageIdx,1)
		this.setState({
			messages: newMessages
		})
	}

	handleUpdateMessage = async messageId => {
		const updatedMessage = await messageAPI.update(messageId)
		const newMessagesArray = this.state.messages.map(p => 
      p._id === updatedMessage._id ? updatedMessage : p
    );
		this.setState(
      {messages: newMessagesArray}
		)
		this.props.history.push('/messagePost')
	}


	  handleUpdateActivity = async activityId => {
		const updatedProfile = await activityAPI.updateActivity(activityId);

		this.setState(
		  {userProfile: updatedProfile},
		);
		this.props.history.push('/addActivity')
	  }


	  handleJoinGroupActivity = async (groupId, activityNo) => {
		  console.log("activityNumber", activityNo)
		  const joinGroupActivity = await groupAPI.joinGroupActivity(groupId, activityNo);
			console.log(joinGroupActivity)
	  }
	  

	async componentDidMount() {
		if (!this.state.userProfile){
			const userProfile = await userAPI.getUserProfile()
			console.log("This is the userProfile", userProfile)
			this.setState({ userProfile })
		}
		this.handleGetAllGroups()
		this.handleGetAllMessages()
		
		}

	render() {
		const { user, userProfile } = this.state
		return (
			<>
			<NavBar user={user} handleLogout={this.handleLogout} />
				
			<Route exact path='/'>
			<Landing user={user} />
			</Route>
				
			<Route exact path='/signup'>
			<Signup history={this.props.history} handleSignupOrLogin={this.handleSignupOrLogin}/>
			</Route>
				
			<Route exact path='/login'>
			<Login handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
			</Route>
				
			<Route 
			exact path="/users"
			render={()=> 
				user ? <Users /> : <Redirect to='/login'/>
			}/>
				
			<Route exact path='/addActivity'>
			<AddActivity 
			userProfile={userProfile}
			handleSignupOrLogin={this.handleSignupOrLogin} 
			history={this.props.history}
			handleAddActivity={this.handleAddActivity}
			handleRemoveActivity={this.handleRemoveActivity}
			/>
			</Route>
			
			<Route exact path='/groupAddActivity'
			render={({history})=>
			<GroupAddActivity 
			groups={this.state.groups}
			userProfile={userProfile}
			handleSignupOrLogin={this.handleSignupOrLogin} 
			history={history}
			handleAddGroupActivity={this.handleAddGroupActivity}
			/>
			}
			
			/>


			<Route exact path='/about'>
			<About handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
			</Route>

			<Route exact path='/calendar'>
			<FullCalendar 
				handleSignupOrLogin={this.handleSignupOrLogin} 
				history={this.props.history}
				plugins={[ dayGridPlugin ]}
				initialViews="dayGridMonth"
				events={[
					{ title: 'event 1', date: '2019-04-01' },
					{ title: 'event 2', date: '2019-04-02' }
				]}
				eventContent={this.renderEventContent}
			/>
			</Route>

			<Route exact path='/group'>
			<Group 
				handleSignupOrLogin={this.handleSignupOrLogin} 
				history={this.props.history} 
				handleCreateGroup={this.handleCreateGroup}
				/>
			</Route>

			<Route 
			exact path='/profile/:id'
			render={({ match })=> 
				authService.getUser() ?
			<ProfileDetails
					match={match}
					groups={this.state.groups}
					handleAddFriend={this.handleAddFriend}
					handleRemoveFriend={this.handleRemoveFriend}
					handleRemoveActivity={this.handleRemoveActivity}
					handleLeaveGroup={this.handleLeaveGroup}
					userProfile={userProfile}
			/> : <Redirect to='/login' />
  			}
			/>

			<Route 
			exact path='/group/:id'
			render={({ match, location })=> 
				authService.getUser() ?
			<GroupDetails
				group={this.state.groups}
				match={match}
				handleJoinGroupActivity={this.handleJoinGroupActivity}
				handleJoin={this.handleJoin}
				handleLeaveGroup={this.handleLeaveGroup}
				userProfile={userProfile}
				location={location}
			/> : <Redirect to='/login' />
			}
			/>


			<Route 
			exact path='/profileList'>
			<ProfileList
				userProfile={this.state.userProfile}
				handleAddFriend={this.handleAddFriend}
				handleRemoveFriend={this.handleRemoveFriend}
			handleSignupOrLogin={this.handleSignupOrLogin} 
			history={this.props.history}/>
			</Route>

			<Route 
			exact path='/groupList'>
			<GroupList
				userProfile={this.state.userProfile}
				groups={this.state.groups}
				handleJoin={this.handleJoin}
				handleLeaveGroup={this.handleLeaveGroup}
			handleSignupOrLogin={this.handleSignupOrLogin} 
			history={this.props.history}/>
			</Route>

			<Route 
			exact path='/messagePost'>
			<MessagePost
				messages={this.state.messages}
				userProfile={userProfile}
				handleAddMessage={this.handleAddMessage}
				handleDeleteMessage={this.handleDeleteMessage}
				handleUpdateMessage={this.handleUpdateMessage}
				/>
			</Route>

			<Route exact path='/edit/:id' 
			render={({location}) => 
			<EditMessageForm
				handleUpdateMessage={this.handleUpdateMessage}
				location={location}
			/>
			} 
			/>

			<Route exact path='/editActivity/:id' render={({location}) => 
			<EditActivityForm
				handleUpdateActivity={this.handleUpdateActivity}
				location={location}
			/>
			} 
			/>

			</>
		)
	}
}

export default App
