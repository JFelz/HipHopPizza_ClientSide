import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function ProductCard({ ProdArr, parentCallback }) {
  const [bool, setBool] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    // Returns the current Product Obj to it's Parent Component.
    parentCallback(ProdArr);

    // 4. Show the productList in the OrderForm file

    setBool(true);

    // const payload = {
    //   ...productDetails,
    //   cartUser: user.uid,
    // };
    // createMyCartOrders(payload).then(({ name }) => {
    //   const patchPayload = { firebaseKey: name };
    //   updateMyCartOrders(patchPayload);
  };

  return (
    <>
      <Link href={`/Products/${ProdArr.id}`} passHref>
        <Card style={{
          height: '250px',
          width: '150px',
          margin: '10px',
          cursor: 'pointer',
        }}
        >
          <Card.Img
            variant="top"
            src={ProdArr?.imageURL}
            alt="Image Failure"
            style={{
              height: '100px',
              objectFit: 'cover',
            }}
          />
          <Card.Body style={{ marginTop: '5px', maxHeight: '50px' }}>
            <Card.Title style={{
              minHeight: '15px',
              fontFamily: 'Poppins',
              fontWeight: 'Bold',
              fontSize: '16px',
            }}
            >{ProdArr.title}
            </Card.Title>

          </Card.Body>
          <Card.Footer
            className="text-muted"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card.Text style={{ marginLeft: '0px' }}>${ProdArr.price}</Card.Text>
            {bool === false
              ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  style={{ backgroundColor: '#A75CD4', width: '100%', borderWidth: '0px' }}
                  onClick={handleClick}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  type="button"
                  className="btn btn-danger"
                  style={{ backgroundColor: '#D84141', width: '100%', borderWidth: '0px' }}
                >
                  In Cart
                </Button>
              )}
          </Card.Footer>
        </Card>
      </Link>
    </>
  );
}

ProductCard.propTypes = {
  ProdArr: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
  parentCallback: PropTypes.func,
};

ProductCard.defaultProps = {
  parentCallback: () => {},
};
