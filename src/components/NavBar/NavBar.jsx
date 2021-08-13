import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
	return (
		<>
			{user ? (
				<nav>
					<div>
						<ul>
							<li>Welcome, {user.name}</li>
							<li>
                <Link to="/users">Users</Link>
              </li>
							<li><Link to='' onClick={handleLogout}>LOG OUT</Link></li>
						</ul>
					</div>
				</nav>
			) : (
				<nav>
					<div>
						<ul>
								<Link to="/login">Log In</Link>
               					<Link to="/users">Users</Link>
								<Link to="/signup">Sign Up</Link>
								<Link to="/addActivity">Add Activity</Link>
						</ul>
					</div>
				</nav>
			)}
		</>
	)
}

export default NavBar
