import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Accordion, Card, Button, Form, Container } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '100vh', position: 'absolute', width: '20rem !important'}}
    >
      <CDBSidebar textColor="#fff" backgroundColor='#343a40' >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
          
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <Container>
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
          </Container>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;