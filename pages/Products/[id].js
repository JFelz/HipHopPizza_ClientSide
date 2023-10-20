import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Carousel,
  Image,
  // Footer,
  Button,
} from 'react-bootstrap';
import { getSingleProduct } from '../../api/productData';

export default function CurrentProductDetails() {
  const [productDetails, setProductDetails] = useState();
  const [bool, setBool] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getIndividualProduct = () => {
    getSingleProduct(id).then(setProductDetails);
  };

  console.log(productDetails);
  console.log(productDetails?.title);

  useEffect(() => {
    getIndividualProduct();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

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
      <Carousel>
        <Carousel.Item>
          <Image
            width={700}
            height={700}
            className="d-block w-100"
            src={productDetails?.imageURL}
            alt="Second slide"
            style={{ objectFit: 'contain', backgroundColor: '#0D0D0D', borderRadius: '10px' }}
          />

          <Carousel.Caption>
            <h3>{productDetails?.title}</h3>
            <p>{productDetails?.title}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            width={700}
            height={700}
            className="d-block w-100"
            src={productDetails?.imageURL}
            alt="Third slide"
            style={{ objectFit: 'contain', backgroundColor: '#0D0D0D', borderRadius: '10px' }}
          />
        </Carousel.Item>
      </Carousel>
      <div className="SplitScreenContainer">
        <div className="ViewPage">
          <h3 style={{ marginTop: '2em', marginBottom: '5px', color: 'white' }}><b>{productDetails?.title}</b></h3>
          <div style={{ display: 'flex', color: '#A75CD4' }}>
            <p>HipHopPizzaNWangs</p>
          </div>
          <h5 style={{
            color: 'white',
            paddingBottom: '15px',
            paddingTop: '15px',
            fontFamily: 'Poppins',
          }}
          >
            PRODUCT DESCRIPTION
          </h5>
          <p style={{ color: 'white', fontFamily: 'Poppins light' }}>{productDetails?.description}</p>
        </div>

        <div style={{
          width: '35%',
          height: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderWidth: '4px',
          borderColor: 'rgb(168, 168, 168)',
          borderRadius: '9px',
          borderStyle: 'solid',
          padding: '30px',
          marginLeft: '60px',
        }}
        >
          <div
            style={{
              width: '100%',
              height: '75px',
              color: '#F4F4F4',
              fontSize: '20px',
            }}
            className="d-flex justify-content-between"
          >
            <p>Total Price:</p>
            <p>USD ${productDetails?.price}</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '85%',
              height: '50px',
              color: '#F4F4F4',
              fontSize: '20px',
            }}
          >
            {bool === false
              ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  style={{ backgroundColor: '#70E35D', width: '100%', borderWidth: '0px' }}
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
                  Already in Cart
                </Button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
