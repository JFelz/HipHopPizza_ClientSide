import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Image, Modal,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import ProductListCards from '../ProductListCards';

const initialState = {
  customerName: '',
  customerEmail: '',
  customerPhoneNumber: null,
  paymentType: '',
  date: null,
  tipAmount: null,
  revenue: 0,
  orderStatus: true,
  review: false,
};

export default function OrderForm({ productList }) {
  const [userData, setUserData] = useState();
  const [OrderFormData, setOrderFormData] = useState(initialState);
  const [prodList, setProdList] = useState();
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const addProductListObjects = () => {
    setProdList(productList);
    console.log('OrderForm ProductList Prop:', productList);
  };

  console.log(prodList);

  const getCashier = () => {
    getSingleUser(user.uid).then(setUserData);
    console.log('normal user:', userData);
    console.log('state user:', userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();
    console.log('Placed Order!');
  };

  useEffect(() => {
    getCashier();
    addProductListObjects();
  }, [productList]);

  return (
    <>
      <div className="checkoutBox">
        <div className="OrderSummary">
          <h1 style={{ fontSize: '15px', margin: '0px', padding: '10px' }}>CASHIER</h1>
          <div className="userDetails">
            <h1 style={{ fontSize: '15px', margin: '0px' }}> {userData?.name}</h1>
            <Image
              style={{
                width: '40px', height: '40px', borderRadius: '100px', objectFit: 'contain',
              }}
              src={userData?.imageURL}
              alt="What"
            />
          </div>
        </div>
      </div>
      <div className="OrderStatus">
        <p style={{ paddingRight: '5px' }}>Order Status:</p> {OrderFormData?.orderStatus ? <p className="Positive"> Open </p> : <p className="Negative">Closed</p>}
      </div>
      <section className="OrderFormSection">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="customerEmail"
              value={OrderFormData?.customerEmail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              name="customerName"
              value={OrderFormData?.customerName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Customer Mobile Number</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Number"
              name="customerPhoneNumber"
              value={OrderFormData?.customerPhoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </section>
      <section className="OrderSection">
        <div className="OrderSubTitles">
          <p style={{ margin: '0px', paddingLeft: '25px' }}> ITEMS </p>
          <div className="qtyPRICE">
            <p style={{ margin: '0px' }}>QTY</p>
            <p style={{ margin: '0px' }}>PRICE</p>
          </div>
        </div>
        <div>
          {prodList?.map((obj) => <ProductListCards key={obj.firebaseKey} ListArr={obj} />)}
        </div>
        <Form.Control
          type="name"
          placeholder="Enter Tip Amount"
          name="tipAmount"
          value={OrderFormData?.tipAmount}
          onChange={handleChange}
          required
        />
        <div className="Taxes">
          <p style={{ margin: '0px', color: '#979797' }}>TIP AMOUNT</p>
        </div>
        <div className="SubTotal">
          <p style={{ margin: '0px', color: '#979797' }}> SUBTOTAL </p>
          $
        </div>
        <Form.Select aria-label="Default select example">
          <option>Select Payment Method</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="american express">American Express</option>
          <option value="apple pay">Apple Pay</option>
          <option value="cash">Cash</option>
        </Form.Select>
        <div className="Total">
          <p><b>TOTAL</b> including Taxes, Tip Amount</p>
          $
        </div>
        <Form.Select aria-label="Default select example">
          <option>Submit Review</option>
          <option value="1">Postive</option>
          <option value="2">Negative</option>
        </Form.Select>
        <div className="OrderButtonForm">
          <Button
            type="button"
            className="btn btn-success"
            style={{
              backgroundColor: '#35CEB3',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderWidth: '0px',
              height: '50px',
              fontSize: '1.5em',
            }}
            onClick={handleSubmit}
          >
            Place Order
          </Button>
          <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
            <Modal.Header closeButton>
              <Modal.Title>Order #{OrderFormData.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Order Status: {OrderFormData.orderStatus ? 'Open' : 'Closed'}</p>
              <p>Date Created: {OrderFormData.date}</p>
              <div>
                <p>Review Rating: {OrderFormData.review ? <p className="Positive">Positive</p> : <p className="Negative">Negative</p>}</p>
              </div>
              <h5>Customer Details</h5>
              <br />
              <p>{OrderFormData.customerName}</p>
              <p>{OrderFormData.customerEmail}</p>
              <p>{OrderFormData.customerPhoneNumber}</p>
              <br />
              <h5>Order Details</h5>
              <br />
              <p>Product List</p>
              {/* {arr[0]?.map((p) => <ProductListCards ListArr={p} />)} */}
              <br />
              <p> Payment Method: <b>{OrderFormData.paymentType}</b> </p>
              <h5> Tip Amount: {OrderFormData.tipAmount} </h5>
              <h5> Total Amount: {OrderFormData.revenue} </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close Order
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    cashierId: PropTypes.number,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerPhoneNumber: PropTypes.number,
    paymentType: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    tipAmount: PropTypes.number,
    revenue: PropTypes.number,
    orderStatus: PropTypes.bool,
    review: PropTypes.bool,
  }).isRequired,
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      imageURL: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.string,
    }),
  ),
};

OrderForm.defaultProps = {
  productList: () => [],
};
