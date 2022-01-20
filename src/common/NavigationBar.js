import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const links = [
    {
      route: '/',
      name: 'Home'
    },
    {
      route: '/profile',
      name: 'Profile'
    },
    {
      route: '/photos',
      name: 'Photos'
    },
    {
      route: '/login',
      name: 'Login'
    },
    {
      route: '/register',
      name: 'Register'
    },
    {
      route: '/admin',
      name: 'Administration'
    }
  ]
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to='/'>Photos APP</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           {links.map(link => (
            <li key={link.route} className="nav-item">
              <NavLink className="nav-link" to={link.route}>{link.name}</NavLink>
            </li>
           ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;