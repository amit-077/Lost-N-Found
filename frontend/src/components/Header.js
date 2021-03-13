import React, { useState } from 'react'
import './Navbar.css'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button, Accordion, Card, Form } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import Sidebar from './Sidebar';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      
  
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      
        <div>
        
          <div className={'nav-menu active'}>
            <div className='justify-content-md-center'>
              <h4 style={{ 'color': 'white' }} className='nav-text'>Filters</h4>
              <div className='acc'>
            <Accordion defaultActiveKey='0'>
      
                  

                <Card className='cards'>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Location
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Card.Body>
                </Accordion.Collapse>
                  </Card>
                  
                  <Card className='cards'>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Category
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='1'>
                  <Card.Body>
                    <Button className='acc-button'>
                        kjsnf
                    </Button>
                    <Button className='acc-button'>
                      kjsnf
                    </Button><Button className='acc-button'>
                      kjsnf
                    </Button><Button className='acc-button'>
                      kjsnf
                    </Button><Button className='acc-button'>
                      kjsnf
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
                  </Card>
                  
                  <Card className='cards'>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Brands
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='2'>
                  <Card.Body>
                  <Form inline className='acc-form'>
                    <Form.Control
                    type='text'
                    name='q'
                    placeholder='Search Brands..'
                    className='acc-search'
                  ></Form.Control>
                  <Button type='submit' variant='outline-success' className='acc-button btn-sm'>
                    Search
                  </Button>
                </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            </div>
            </div>
            
            
            
            
            
          </div>
    
        </div>



        
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
        
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
