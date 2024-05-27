import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>
        <Link to="/" style={logoStyle}>Sports Hub</Link>
      </div>
      <ul style={ulStyle}>
        <li><button onClick={handleLogout} style={logoutButtonStyle}>Logout</button></li>
      </ul>
    </nav>
  );

};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#222',
  color: '#fff',
  padding: '10px 20px',
};

const brandStyle = {
  flex: '1',
};

const logoStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '10px',
  transition: 'color 0.3s ease',
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'color 0.3s ease',
};

export default Navbar;
