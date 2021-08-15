import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import About from '../About/About'
import AddActivity from '../AddActivity/AddActivity'
import Calendar from '../Calendar/Calendar'
import Group from '../Group/Group'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import ProfileList from '../ProfileList/ProfileList'
import Signup from '../Signup/Signup'
import * as authService from '../../services/authService'
import * as userAPI from '../../services/userService'
import Users from '../Users/Users'
import './App.css'
import * as profileAPI from '../../services/profileService'



class App extends Component {
	state = {
		user: authService.getUser(),
		userProfile: null
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
		this.setState({ userProfile: updatedProfile })
	}

	handleRemoveFriend = async friendId => {
		const updatedProfile = await profileAPI.unfriend(friendId)
		this.setState({ userProfile: updatedProfile })
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
          <AddActivity handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>
				
		<Route exact path='/about'>
          <About handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route exact path='/calendar'>
          <Calendar handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route exact path='/group'>
          <Group handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route exact path='/profileDetails'>
          <ProfileDetails handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>

		<Route exact path='/profileList'>
          <ProfileList handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>


			</>
		)
	}
}

export default App
