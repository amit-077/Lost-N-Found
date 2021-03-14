import React, { useState, useEffect } from "react";
import { Accordion, Container, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Side.css"
import MyMap from './map/map';
import axios from 'axios';

function Side() {
  let history = useHistory();

  const pickUpInit = {address:'', lat:0, lng:0};
  const [pickUp,setPickUp] = useState(pickUpInit);
  const dropInit = {address:'', lat:0, lng:0};
  const [drop,setDrop] = useState(dropInit);
  const [mapInit, setMapInit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [myFilter, setMyfilter] = useState({
    location: {lat:0, lng:0},
    category: '',
    brand: ''
  });

  useEffect(() => {
    var data = JSON.stringify({
      query: `query getCategories {
        getCategories {
            _id
            name
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setCategories(response.data.data.getCategories);
    })
    .catch(function (error) {
      console.log(error);
    });

    var data1 = JSON.stringify({
      query: `
				{
					getProducts {
						_id
						name
						user {
							_id
							name
						}
						image
						brand {
							_id
							name
						}
						category {
							_id
							name
						}
						subcategory {
							_id
							name
						}
						description
					}
				}`,
      variables: {}
    });
    
    var config1 = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data1
    };
    
    axios(config1)
    .then(function (response) {
      let myData = [], myBrands = [];
      myData = response.data.data.getProducts;
      for(let i=1;i<myData.length;i++) {
        myBrands.push(myData[i].brand);
      }
      setBrands(myBrands);
    })
    .catch(function (error) {
      console.log(error);
    });
}, [])

  const brandButton = brands.map((brand) => <Button className='acc-button' key={brand.name}
  onClick={() => setMyfilter({...myFilter, brand: brand.name})}
  >{brand.name}</Button>);

  const categoriesButton = categories && categories.map((brand) => <Button className='acc-button' key={brand.name}
  onClick={() => setMyfilter({...myFilter, category: brand.name})}
  >{brand.name}</Button>);

  useEffect(() => {
    if(pickUp.lat !== 0 || myFilter.category !== '' || myFilter.brand !== '') {
      history.push(`/search/filters=${myFilter.category}+${myFilter.brand}+${pickUp.lat}+${pickUp.lng}`)
    }
  }, [myFilter, pickUp])


  const [sidebar, setSidebar] = useState(false);
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
                <Card.Body style={{color: 'black', textAlign: 'center', padding: '0'}}>
                  {/* <div style={{width: '1rem', height: '100px',textAlign: 'center'}}> */}
                    <MyMap
                      pU={pickUp} 
                      sPU={setPickUp} 
                      d={drop} 
                      sD={setDrop} 
                      mI={mapInit}
                    />
                  {/* </div> */}
                </Card.Body>
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