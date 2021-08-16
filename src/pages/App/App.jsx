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
import ProfileList from '../ProfileList/ProfileList'
import Signup from '../Signup/Signup'
import * as authService from '../../services/authService'
import * as userAPI from '../../services/userService'
import * as activityAPI from '../../services/activityService'
import Users from '../Users/Users'
import './App.css'
import * as profileAPI from '../../services/profileService'



class App extends Component {
	state = {
		user: authService.getUser(),
		userProfile: null
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

	handleAddFriend = async friendId => {
		const updatedProfile = await profileAPI.friend(friendId)
		console.log(updatedProfile)
		this.setState({ userProfile: updatedProfile })
	}

	handleRemoveFriend = async friendId => {
		const updatedProfile = await profileAPI.unfriend(friendId)
		this.setState({ userProfile: updatedProfile })
	}

	handleAddActivity = async activity =>{
		const updatedProfile = await activityAPI.addActivity(activity)
		this.setState({updatedProfile: updatedProfile})
	} 

	handleRemoveActivity = async activity =>{
		const updatedProfile = await activityAPI.removeActivity(activity)
		this.setState({updatedProfile:updatedProfile})
	}

	async componentDidMount() {
		if (!this.state.userProfile){
			const userProfile = await userAPI.getUserProfile()
			this.setState({ userProfile })
		}
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
          <Group handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route 
		exact path='/profile/:id'
		render={({ match })=> 
			authService.getUser() ?
          <ProfileDetails
		  match={match}
		  handleAddFriend={this.handleAddFriend}
		  handleRemoveFriend={this.handleRemoveFriend}
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
