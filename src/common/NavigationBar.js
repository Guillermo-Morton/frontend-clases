import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';


const NavigationBar = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))
  const location = useLocation()
  const navigate = useNavigate()
  const links = [
    {
      route: '/',
      name: 'Home',
      hide: false
    },
    {
      route: '/profile',
      name: 'Profile',
      hide: !token
    },
    {
      route: '/photos',
      name: 'Photos',
      hide: false
    },
    {
      route: '/login',
      name: 'Login',
      hide: token
    },
    {
      route: '/register',
      name: 'Register',
      hide: token
    },
    {
      route: '/admin',
      name: 'Administration',
      hide: user?.role !== 'ADMIN_ROLE'
    }
  ]
  const cerrarSesion = ()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  // useEffect(()=> {
  //   // console.log('Hola soy el navbar')
  // },[location])
  // if (link.hide) {
  //   HACE EL CODIGO
  // }

  // ternarios

  // link.hide ? hace el codigo : y sino hace este

  // link.hide && hace el codigo
  return (

      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Fotos app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map(link => (
              <li key={link.route} className={`nav-item ${link.hide && 'd-none'}`}>
                <NavLink className="nav-link" to={link.route}>{link.name}</NavLink>
              </li>
            ))}
            <li onClick={()=> cerrarSesion()} className={`nav-item ${!token && 'd-none'}`}>
              <span className='nav-link'>Cerrar sesion</span>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
};

export default NavigationBar;