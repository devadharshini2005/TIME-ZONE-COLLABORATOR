// UserProfile.js
import React from 'react';

const UserProfile = ({ userEmail }) => {
  return (
    <div className="user-profile">
      <p>{userEmail}</p>
    </div>
  );
};

export default UserProfile;
