import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({ name: '', mobile: '', email: '', location: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-pic-container">
        <img src='https://via.placeholder.com/150' alt="Profile" className="profile-pic" />
      </div>
      <div className="profile-details">
        <h1>{profileData.name}</h1>
        <p>Phone: {profileData.mobile}</p>
        <p>Email: {profileData.email}</p>
        <p>Location: {profileData.location}</p>
      </div>
    </div>
  );
};

export default Profile;
