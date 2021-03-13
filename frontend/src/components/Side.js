import React, { useState } from "react";
import { Accordion, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Side.css"

function Side() {

  const brands = [
    { name: "lsjvnj" }, { name: "lsjvnj" }, { name: "lsjvnj" }, { name: "lsjvnj" }
  ];

  const Categories = [
    { name: "lsjvnj" }, { name: "lsjvnj" }, { name: "lsjvnj" }, { name: "lsjvnj" }
  ];

  const brandButton = brands.map((brand) => <Button className='acc-button' key={brand.name}>{brand.name}</Button>);

  const categoriesButton = brands.map((brand) => <Button className='acc-button' key={brand.name}>{brand.name}</Button>);


  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav className={sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={showSidebar}>
        <div></div>
      </button>
      <ul> 
        <Container className='justify-content-md-center'>
          <div className='side-heading'>
          <h3 style={{ 'color': 'white' }}>Filters</h3>
          </div>
          </Container>

          <div className='acc-container'>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className='justify-content-center'>
                <Accordion.Toggle as={Button} variant='light' eventKey="0">
                  Location
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{color: 'black'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="1">
                  Categories
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>{ categoriesButton}</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="2">
                  Brands
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>{brandButton}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        
          </div>
          
  
      </ul>
    </nav>
  );
}

export default Side;