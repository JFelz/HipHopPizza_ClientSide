import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function ProductCard({ ProdArr }) {
  return (
    <>
      <Link href={`/Manageproducts/${ProdArr.id}`} passHref>
        <Card style={{
          height: '400px',
          width: '250px',
          margin: '10px',
          cursor: 'pointer',
        }}
        >
          <Card.Img
            variant="top"
            src={ProdArr.imageURL}
            alt="Image Failure"
            style={{
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <Card.Body style={{ marginTop: '5px' }}>
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
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Card.Text style={{ marginLeft: '85px' }}>${ProdArr.price}</Card.Text>
            <Button variant="success"> Add To Cart </Button>
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
  }).isRequired,
};
