//profile page
//this page is going to be rendered after a user clicks add activity
import React from 'react';

const Profile = ({ location, userProfile }) => {
    const { user } = location.state
    
        return (
            <>
            <h1>{user.name}'s Profile</h1>
      
            <h2>Friends</h2>
            {user.friends.map(user => 
              <>
                <h3 key={user._id}>
                  {user.name}
                </h3>
              </>
            )}
          </>
        );
      }
    

export default Profile;
