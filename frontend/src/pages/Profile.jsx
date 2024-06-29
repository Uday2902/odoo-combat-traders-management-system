// src/components/Profile.js
import React from 'react';

const Profile = () => {
  return (
    <div style={styles.profile}>
      <div style={styles.image}>Image</div>
      <div style={styles.details}>
        <p>Name:</p>
        <p>Phone No:</p>
      </div>
    </div>
  );
};

const styles = {
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

export default Profile;
