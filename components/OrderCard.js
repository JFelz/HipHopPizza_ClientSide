import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getUserById } from '../api/userData';
import { getOrderProductlist, deleteOrder } from '../api/orderData';
import ProductListCards from './ProductListCards';

export default function OrderCard({ orderObj }) {
  const [cashier, setCashier] = useState({});
  const [OrderproductList, setOrderproductList] = useState([{}]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const getProductList = () => {
    getOrderProductlist(orderObj.id).then(setOrderproductList);

    console.log('ProductList:', OrderproductList.map((o) => o.productList));
  };

  let arr = [{}];
  arr = (OrderproductList.map((o) => o.productList));

  const getCashier = () => {
    getUserById(orderObj.cashierId).then(setCashier);
    console.log('cashier:', cashier);
  };

  // Total Revenue calculation

  const deleteCurrentOrder = () => {
    if (window.confirm(`Are you sure you want to delete Order #${orderObj.id}?`)) {
      deleteOrder(orderObj.id).then(() => {
        window.location.reload(true);
        handleClose();
      });
    }
  };

  useEffect(() => {
    getCashier();
    getProductList();
  }, []);

  return (
    <>
      <Button className="OrderButton" onClick={handleShow}>
        <Card style={{
          display: 'flex',
          flexDirection: 'row',
          height: '85px',
          width: '99.8%',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          margin: '.3em',
          borderTopWidth: '0px',
          borderRightWidth: '0px',
          borderLeftWidth: '0px',
          borderBottomWidth: '0px',
          borderTopColor: '#383838',
          boxSizing: 'content-box',
          backgroundColor: '#18181C',
          borderRadius: '5px',
        }}
        >
          <Card.Body style={{ marginTop: '5px' }}>
            <Card.Title
              style={{
                minHeight: '15px',
                fontFamily: 'Poppins',
                fontWeight: 'Bold',
                fontSize: '16px',
                width: '15em',
              }}
            > Customer: {orderObj?.customerName}
            </Card.Title>
            <Card.Subtitle style={{
              fontFamily: 'Poppins',
              fontWeight: 'normal',
              color: '#979797',
              fontSize: '13px',
              width: '14em',
            }}
            > Cashier: {cashier?.name}
            </Card.Subtitle>

          </Card.Body>

          <Card.Body style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '0px',
          }}
          >
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0px',
              width: '0px',
              alignItems: 'center',
            }}
            >
              <Card.Text style={{ marginBottom: '5px', width: '50px', fontFamily: 'Poppins' }}><b>Review</b></Card.Text>
              <Card.Text style={{ width: '70px', color: '#A75CD4' }}>
                {orderObj?.review ? <p className="Positive">Positive</p> : <p className="Negative">Negative</p>}
              </Card.Text>
            </Card.Body>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0px',
              width: '0px',
              alignItems: 'center',
            }}
            >
              <Card.Text style={{ marginBottom: '5px', width: '50px', fontFamily: 'Poppins' }}><b>Status</b></Card.Text>
              <Card.Text style={{ width: '70px', color: '#A75CD4' }}>{orderObj?.orderStatus ? 'Open' : 'Closed'}</Card.Text>
            </Card.Body>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              width: '0px',
            }}
            >
              <Card.Text style={{ marginBottom: '5px', width: '50px', fontFamily: 'Poppins' }}><b>Total</b></Card.Text>
              <Card.Text style={{ width: '70px', color: '#A75CD4' }}>USD ${orderObj?.revenue}</Card.Text>
            </Card.Body>
          </Card.Body>
        </Card>
      </Button>
      <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>Order #{orderObj?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order Status: {orderObj?.orderStatus ? 'Open' : 'Closed'}</p>
          <div>
            <p>Review Rating: {orderObj?.review ? <p className="Positive">Positive</p> : <p className="Negative">Negative</p>}</p>
          </div>
          <h5>Customer Details</h5>
          <br />
          <p>{orderObj?.customerName}</p>
          <p>{orderObj?.customerEmail}</p>
          <p>{orderObj?.customerPhoneNumber}</p>
          <br />
          <h5>Order Details</h5>
          <br />
          <p>Product List</p>
          {arr[0]?.map((p) => <ProductListCards ListArr={p} />)}
          <br />
          <p> Payment Method: <b>{orderObj?.paymentType}</b> </p>
          <h5> Tip Amount: {orderObj?.tipAmount} </h5>
          <h5> Total Amount: {orderObj?.revenue} </h5>
        </Modal.Body>
        <Modal.Footer>
          <Link href={`/Order/edit/${orderObj.id}`} passHref>
            <Button style={{ backgroundColor: '#A75CD4', borderColor: '#A75CD4' }} onClick={handleClose}>
              Edit Order
            </Button>
          </Link>
          <Button variant="danger" onClick={deleteCurrentOrder}>
            Delete Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

OrderCard.propTypes = {
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
};
