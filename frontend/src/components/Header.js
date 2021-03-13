import React, { useState } from 'react'
import './Navbar.css'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button, Accordion, Card, Form } from 'react-bootstrap'
import Side from './Side';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import axios from 'axios';



const myAppName = "LOST N FOUND";
const myDescription = "";
const myColor = "#686CFD";

const paymentHandler = async (amnt) => {
	const orderAmount = amnt;
  const API_URL = 'http://localhost:5000/'
  // e.preventDefault();
  const orderUrl = `${API_URL}order`;
  const response = await axios.get(orderUrl,
     { params: { amount: orderAmount } });
  const { data } = response;
  const options = {
    key: process.env.RAZOR_PAY_TEST_KEY,
    name: myAppName,
    description: myDescription,
    order_id: data.id,
    
    handler: async (response) => {
      try {
       const paymentId = response.razorpay_payment_id;
       const url = `${API_URL}capture/${paymentId}`;
       const captureResponse = await axios.post(url, {})
       console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: myColor,
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

const handleDonate = () => {
	Swal.mixin({
		input: 'number',
		confirmButtonText: 'Pay &rarr;',
		allowOutsideClick: false,
		allowEscapeKey: false,
		// progressSteps: ['1']
	}).queue([
		{
			title: 'Support Us',
			text: 'Enter the amount'
		},
	]).then((result) => {
		if (result.value) {
			const answers = result.value;
			console.log(answers[0]);		
			paymentHandler(answers[0]);
	 	}
  })
};

const Header = () => {
	const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [brand, setBrand] = useState('');
	const userLogin = useSelector((state) => state.userLogin);

	const editSearch = (e) => {
		setBrand(e.target.value);
	};

  const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<div>
					<div className={'nav-menu active'}>
						<div className="justify-content-md-center">
							<h4 style={{ color: 'white' }} className="nav-text">
								Filters
							</h4>
							<div className="acc">
								<Accordion defaultActiveKey="0">
									<Card className="cards">
										<Card.Header>
											<Accordion.Toggle
												as={Button}
												variant="link"
												eventKey="0"
											>
												Location
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body>
												Lorem Ipsum is simply dummy text
												of the printing and typesetting
												industry. Lorem Ipsum has been
												the industry's standard dummy
												text ever since the 1500s, when
												an unknown printer took a galley
												of type and scrambled it to make
												a type specimen book. It has
												survived not only five
												centuries, but also the leap
												into electronic typesetting,
												remaining essentially unchanged.
												It was popularised in the 1960s
												with the release of Letraset
												sheets containing Lorem Ipsum
												passages, and more recently with
												desktop publishing software like
												Aldus PageMaker including
												versions of Lorem Ipsum.
											</Card.Body>
										</Accordion.Collapse>
									</Card>

									<Card className="cards">
										<Card.Header>
											<Accordion.Toggle
												as={Button}
												variant="link"
												eventKey="1"
											>
												Category
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="1">
											<Card.Body>
												<Button className="acc-button">
													kjsnf
												</Button>
												<Button className="acc-button">
													kjsnf
												</Button>
												<Button className="acc-button">
													kjsnf
												</Button>
												<Button className="acc-button">
													kjsnf
												</Button>
												<Button className="acc-button">
													kjsnf
												</Button>
											</Card.Body>
										</Accordion.Collapse>
									</Card>

									<Card className="cards">
										<Card.Header>
											<Accordion.Toggle
												as={Button}
												variant="link"
												eventKey="2"
											>
												Brands
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="2">
											<Card.Body>
												<Form
													inline
													className="acc-form"
												>
													<Form.Control
														type="text"
														name="q"
														placeholder="Search Brands.."
														className="acc-search"
													></Form.Control>
													<Button
														type="submit"
														variant="outline-success"
														className="acc-button btn-sm"
													>
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
					<LinkContainer to="/">
						<Navbar.Brand>Lost N Found</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route
							render={({ history }) => (
								<SearchBox history={history} />
							)}
						/>

						<Nav className="ml-auto">
							{/* <LinkContainer to="/cart"> */}
								<Nav.Link onClick={() => handleDonate()}>
									<i className="fas fa-donate"></i>{' '}
									Donate
								</Nav.Link>
							{/* </LinkContainer> */}

							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>
											Users
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>
											Products
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>
											Orders
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
