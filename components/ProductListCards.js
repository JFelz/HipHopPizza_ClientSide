import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ProductListCards({ ListArr }) {
  return (
    <>
      <Card style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '85px',
        width: '99.8%',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
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
        <Card.Img
          variant="top"
          src={ListArr?.imageURL}
          alt="Image Failure"
          style={{
            alignItems: 'center',
            margin: '.5em',
            height: '50px',
            width: '50px',
            objectFit: 'contain',
          }}
        />
        <Card.Body style={{ marginTop: '5px' }}>
          <Card.Title
            style={{
              minHeight: '10px',
              fontFamily: 'Poppins',
              fontWeight: 'normal',
              fontSize: '12px',
              width: '15em',
            }}
          >{ListArr.title}
          </Card.Title>

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
            <Card.Text style={{ marginBottom: '5px', width: '50px', fontFamily: 'Poppins' }}><b>Price</b></Card.Text>
            <Card.Text style={{ width: '50px', color: '#6FBD54' }}>{ListArr.price}</Card.Text>
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
}

ProductListCards.propTypes = {
  ListArr: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
};
