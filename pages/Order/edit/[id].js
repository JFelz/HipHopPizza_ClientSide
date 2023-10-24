import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Image, Modal,
} from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser } from '../../../api/userData';
import { createOrder } from '../../../api/orderData';
import ProductListCards from '../../../components/ProductListCards';

const initialState = {
  cashierId: null,
  customerName: '',
  customerEmail: '',
  customerPhoneNumber: null,
  productList: [],
  paymentType: '',
  tipAmount: null,
  revenue: 0,
  orderStatus: true,
  review: false,
};

export default function OrderForm({ productList, DeletePL }) {
  const [userData, setUserData] = useState({});
  const [OrderFormData, setOrderFormData] = useState(initialState);
  const [prodList, setProdList] = useState();
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const addProductListObjects = () => {
    setProdList(productList);
    console.log('OrderForm ProductList Prop:', productList);
  };

  const deleteProd = (ListArr) => {
    setProdList((prevProdList) => prevProdList.filter((p) => p.id !== ListArr.id));
    DeletePL(ListArr);
    // productList callback - suppose to directly affect the state its being passed into this form
    productList.slice();
  };

  console.log('current prodList:', prodList);

  const getCashier = () => {
    getSingleUser(user.uid)
      .then((userResult) => {
        // Update the userData state with the result from getSingleUser
        setUserData(userResult);

        // Set the cashierId in OrderFormData
        setOrderFormData((prevState) => ({
          ...prevState,
          cashierId: userResult.id,
        }));
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching user data:', error);
      });
  };

  console.log('users:', userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderFormData((prevState) => ({
      ...prevState,
      paymentType: OrderFormData.paymentType,
      orderStatus: false,
      review: OrderFormData.review,
      cashierId: userData.id,
      productList: prodList,
    }));
    handleShow();
    console.log('Placed Order!', OrderFormData);

    if (OrderFormData) {
      await createOrder(OrderFormData);
    }
  };

  const switchToggle = (e) => {
    OrderFormData.review = e.target.checked;

    if (OrderFormData.review === true && e.target.checked) {
      setOrderFormData((prevState) => ({
        ...prevState,
        review: true,
      }));
    } else {
      setOrderFormData((prevState) => ({
        ...prevState,
        review: false,
      }));
    }
  };
  console.log(OrderFormData);

  const handleClose = () => {
    setShow(false);
    window.location.reload(true);
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
          {productList?.map((obj) => <ProductListCards key={obj.id} ListArr={obj} DelCallBack={deleteProd} />)}
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
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Enter Payment Type</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Payment Type"
            name="paymentType"
            value={OrderFormData?.paymentType}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="Total">
          <p><b>TOTAL</b> including Taxes, Tip Amount</p>
          $
        </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="Check for a Positive Review"
            name="isStaff"
            checked={OrderFormData.review}
            onChange={switchToggle}
          />
        </Form.Group>
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
              <p>Cashier: {userData.id}</p>
              <p>Order Status: {OrderFormData.orderStatus === true ? 'Open' : 'Closed'}</p>
              <div>
                <p>Review Rating: {OrderFormData.review === true ? <span className="Positive">Positive</span> : <span className="Negative">Negative</span>}</p>
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
              {productList?.map((p) => <ProductListCards ListArr={p} />)}
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
    productList: PropTypes.arrayOf(PropTypes.shape),
    paymentType: PropTypes.string,
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
  ListArr: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
  DeletePL: PropTypes.func,
};

OrderForm.defaultProps = {
  productList: () => [],
  DeletePL: () => {},
};
