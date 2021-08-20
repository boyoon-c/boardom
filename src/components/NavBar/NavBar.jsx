import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ user, handleLogout }) => {
	return (
		<>
			{user ? (
				<nav>
					<div className="nav">
						<main className="fs-4">
							Welcome, {user.name} 
						</main>
						<div className="nav-header">
							<Link to="/">Home</Link>
							<Link to="/about">About</Link>
							<Link to="/group">Create Group</Link>
							<Link to="/grouplist">Grouplist</Link>
							<Link to={`/profile/${user.profile}`}>Profile Details</Link>
							<Link to="/profileList">User List</Link>
							<Link to="/messagePost">Message Board</Link>
							<Link to='' onClick={handleLogout}>LOG OUT</Link>
						</div>
					</div>
				</nav>
			) : (
				<nav>
					<div className="nav">
						<ul className="nav-header">
								<Link to="/login">Log In</Link>
								<Link to="/signup">Sign Up</Link>
						</ul>
					</div>
				</nav>
			)}
		</>
	)
}

export default NavBar


