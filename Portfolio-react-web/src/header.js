import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import button from './images/Button.png';
import logo from './images/logo.png';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Header = (props) => { // Fix: Use props object to access properties
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="EMSI Portfolio Logo" />
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><a href="/home">Home</a></li>
        </ul>
      </nav>
      <div className="header-right">
        <div className="search-container">
          <input type="text" placeholder="Search.." />
          <img src={button} alt="Search" />
        </div>
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={props.currentPic} style={{width:40, height:40, borderRadius: '50%', marginRight: 15, marginTop:5}} />
          {showDropdown && (
            <div className="profile-dropdown">
              <ul>
                <li><a href={`/profil/${props.currentUserId}`}>View Profile</a></li> {/* Fix: Access currentUserId via props */}
                <li><a href="/">Log Out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
