import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import About from '../About/About'
import AddActivity from '../AddActivity/AddActivity'
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
import * as authService from '../../services/authService'
import * as userAPI from '../../services/userService'
import * as activityAPI from '../../services/activityService'
import * as groupAPI from '../../services/groupService'
import Users from '../Users/Users'
import './App.css'
import * as profileAPI from '../../services/profileService'
import MessagePost from '../MessagePost/MessagePost'
import * as messageAPI from '../../services/messagePostService'

class App extends Component {
	state = {
		user: authService.getUser(),
		userProfile: null,
		groups: [],
		messages: [],
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
		this.setState ({ userProfile: newGroup }) // not sure what to set new group
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
		this.setState({ groups: updatedGroup })
	}
	
	handleLeaveGroup = async groupId => {
		const updatedGroup = await groupAPI.leave(groupId)
		this.setState({ groups: updatedGroup })
	}
	
	handleAddActivity = async activity =>{
		const updatedProfile = await activityAPI.addActivity(activity)
		console.log('updatedProfile', updatedProfile)
		this.setState({userProfile: updatedProfile})
	} 
	
	handleRemoveActivity = async activity =>{
		const updatedProfile = await activityAPI.removeActivity(activity)
		this.setState({updatedProfile:updatedProfile})
	}
	
	handleGetAllMessages = async () => {
		const messages = await messageAPI.getAllMessages()
		this.setState({ messages: messages })
	}
	
	handleAddMessage = async message => {
		const newMessage = await messageAPI.createMessagePost(message)
		this.setState(state => ({
			messages: [...state.messages, newMessage]
		})
	)}

	handleDeleteMessage = async messageId => {
		const updatedMessages = await messageAPI.deleteMessagePost(messageId)
		console.log('updatedMessages', updatedMessages)
		this.setState({
			messages: updatedMessages
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
	}

	handleUpdateActivity = async updatedActivityData => {
		// const updatedPuppy = await activityAPI.updateActivity(updatedActivityData);
		// const newPuppiesArray = this.state.puppies.map(p => 
		//   p._id === updatedPuppy._id ? updatedPuppy : p
		// );
		// this.setState(
		//   {puppies: newPuppiesArray},
		//   // Using cb to wait for state to update before rerouting
		//   () => this.props.history.push('/')
		// );
	  }

	async componentDidMount() {
		if (!this.state.userProfile){
			const userProfile = await userAPI.getUserProfile()
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
				
		<Route exact path='/about'>
          <About handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route exact path='/calendar'>
          <FullCalendar 
		  	handleSignupOrLogin={this.handleSignupOrLogin} 
			history={this.props.history}
			plugins={[ dayGridPlugin ]}
			initialViews="dayGridMonth"
			
			//events={this.state.events}
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
		  handleAddFriend={this.handleAddFriend}
		  handleRemoveFriend={this.handleRemoveFriend}
		  handleRemoveActivity={this.handleRemoveActivity}
		  userProfile={userProfile}
	  /> : <Redirect to='/login' />

  }
/>
		<Route 
		exact path='/group/:id'
		render={({ match })=> 
			authService.getUser() ?
          <GroupDetails
		  match={match}
		  handleJoin={this.handleJoin}
		  handleLeaveGroup={this.handleLeaveGroup}
		  userProfile={userProfile}
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
		  	handleJoinGroup={this.handleJoinGroup}
			handleLeaveGroup={this.handleLeaveGroup}
		   handleSignupOrLogin={this.handleSignupOrLogin} 
		   history={this.props.history}/>
        </Route>
		<Route 
			exact path='/messagePost'>
          <MessagePost
						messages={this.state.messages}
						handleAddMessage={this.handleAddMessage}
						handleDeleteMessage={this.handleDeleteMessage}
						handleUpdateMessage={this.handleUpdateMessage}
						/>
        </Route>
			</>
		)
	}
}

// function renderEventContent(eventInfo) {
// 	return (
// 	  <>
// 		<b>{eventInfo.timeText}</b>
// 		<i>{eventInfo.event.title}</i>
// 	  </>
// 	)
//   }

export default App
