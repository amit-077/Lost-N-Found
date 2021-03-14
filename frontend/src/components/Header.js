import React, { useState } from 'react';
import './Navbar.css';
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Navbar,
	Nav,
	Container,
	NavDropdown,
	Button,
	Accordion,
	Card,
	Form,
} from 'react-bootstrap';
import Side from './Side';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import Swal from 'sweetalert2';
import axios from 'axios';

const myAppName = 'LOST N FOUND';
const myDescription = '';
const myColor = '#343a40';

const paymentHandler = async (amnt) => {
	const orderAmount = amnt;
	const API_URL = 'http://localhost:5000/';
	// e.preventDefault();
	const orderUrl = `${API_URL}order`;
	const response = await axios.get(orderUrl, {
		params: { amount: orderAmount },
	});
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
				const captureResponse = await axios.post(url, {});
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
	})
		.queue([
			{
				title: 'Support Us',
				text: 'Enter the amount',
			},
		])
		.then((result) => {
			if (result.value) {
				const answers = result.value;
				console.log(answers[0]);
				paymentHandler(answers[0]);
			}
		});
};

const Header = () => {
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);

	const [brand, setBrand] = useState('');
	const userLogin = useSelector((state) => state.userLogin);

	const editSearch = (e) => {
		setBrand(e.target.value);
	};

	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Side />

				<Container>
					<LinkContainer to="/">
						<Navbar.Brand
							style={{ marginLeft: 'auto', marginRight: 'auto' }}
						>
							Lost N Found
						</Navbar.Brand>
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
								<i className="fas fa-donate"></i> Donate
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
							{userInfo && (
								<NavDropdown title="Navigate" id="adminmenu">
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
