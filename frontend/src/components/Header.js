import React, { useState } from 'react'
import './Navbar.css'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import Sidebar from './Sidebar';

const Header = () => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      
  
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      {sidebar ? ((
        <div>
        
        <div className={'nav-menu active'}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
              </Link>
                </li>
            <a onClick={showSidebar}>X</a>
            <ul>
                <li>Hi</li> 
            </ul>
          
        </div>
    
        </div>
        )) : (<Button onClick={showSidebar}>
          Filters
        </Button>)}


        
        <Container>
        <Button onClick={showSidebar}>
        Filters
      </Button>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <NavDropdown title='Filters' id='filter' style={{color:'white !important', textDecoration:'none'}}>
                  <NavDropdown.Item>Mobile</NavDropdown.Item>
            </NavDropdown>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
