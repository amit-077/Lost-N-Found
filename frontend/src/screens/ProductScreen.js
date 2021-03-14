import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import ApplicationComponent from '../components/ApplicationComponent';
import Swal from 'sweetalert2';
import axios from 'axios';
import MyMap from '../components/map/map2';
import ViewApp from '../components/ViewApp';

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

const handleGift = () => {
	Swal.mixin({
		input: 'number',
		confirmButtonText: 'Pay &rarr;',
		allowOutsideClick: false,
		allowEscapeKey: false,
		// progressSteps: ['1']
	})
		.queue([
			{
				title: 'Show your love',
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

const ProductScreen = ({ history, match }) => {
  const pickUpInit = {address:'', lat:19.0760, lng:72.8777};
  const [pickUp,setPickUp] = useState(pickUpInit);
  
  //Email id of User Logged In
  const [userName,setUsername] = useState("")
  const founder = ""

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (product && (!product._id || product._id !== match.params.id)) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  useEffect(() => {
    if(product && product.location)
    setPickUp({lat: product.location.coordinates[0],lng: product.location.coordinates[1]});
  }, [product])

  const handleChat = (call) => {
    window.location.href=`tel:+${call}`;
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product && product.name} />
          <Row>
            <Col md={6}>
              <Image src={product && product.image} alt={product && product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product && product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product && product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Founder:</Col>
                      <Col>
                        <strong>{product && product.user && product.user.name}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={() => handleChat(product && product.user && product.user.phoneNo)}
                      className='btn-block'
                      type='button'
                    >
                      <i class="fas fa-phone fa-lg" /> &nbsp;Contact Founder
                    </Button>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={() => handleGift()}
                      className='btn-block'
                      type='button'
                    >
                      <i class="fas fa-gift fa-lg" /> &nbsp;Gift Founder
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <br />
              <Card>
                <ListGroup variant='flush'>
                    <MyMap
                      pU={pickUp} 
                    />
                 </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              
              <ListGroup variant='flush'>
                
                <ListGroup.Item>
                  <h2>Product Claim Form</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Application submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
										product &&
										product.user &&
										product.user.email &&
										userInfo.email ===
											product.user.email ? (<div>
                      <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      // disabled={product.countInStock === 0}
                    >View Applications</Button>
                    <ViewApp />
                    </div>) :<ApplicationComponent />
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
