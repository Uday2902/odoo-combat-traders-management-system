// src/components/Header.js
import React from 'react';
import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <header style={styles.header}>
      <NavLink exact to="/exporter-dashboard" activeClassName="active" className='header'>
        <button>Dashboard</button>
      </NavLink>
      <NavLink to="/exporter-shipnow" activeClassName="active">
      <button>Shipnow</button>
      </NavLink>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
  },
  button: {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default Header;
