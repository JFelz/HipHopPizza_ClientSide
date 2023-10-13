import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Carousel,
  Image,
  // Footer,
  // Button,
} from 'react-bootstrap';
import { getSingleProduct } from '../../api/productData';

export default function CurrentProductDetails() {
  const [productDetails, setProductDetails] = useState();
  // const [bool, setBool] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getIndividualProduct = () => {
    getSingleProduct(id).then((details) => {
      if (details) {
        setProductDetails(details);
      }
    });
    console.log(productDetails);
  };

  useEffect(() => {
    getIndividualProduct();
  }, []);

  // const handleClick = (e) => {
  //   e.preventDefault();

  //   setBool(true);

  //   // const payload = {
  //   //   ...productDetails,
  //   //   cartUser: user.uid,
  //   // };
  //   // createMyCartOrders(payload).then(({ name }) => {
  //   //   const patchPayload = { firebaseKey: name };
  //   //   updateMyCartOrders(patchPayload);
  // };

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            width={700}
            height={700}
            className="d-block w-100"
            src={productDetails?.imageURL}
            alt="First slide"
            style={{ objectFit: 'contain', backgroundColor: '#0D0D0D', borderRadius: '10px' }}
          />
          <Carousel.Caption>
            <h3>{productDetails?.title}</h3>
            <p>{productDetails?.category}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <Carousel.Item>
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
      <div className="ViewPage">
        <div style={{ width: '50%', backgroundColor: '' }} className="text-black ms-5 details">
          <div style={{
            display: 'flex',
            color: '#7B7B7B',
            width: '200px',
            alignItems: 'center',
            marginBottom: '15px',
          }}
          >
            <Image src="/viewEye.png" style={{ height: '25px' }} />
          </div>
          <h3 style={{ marginBottom: '5px', color: 'white' }}><b>{productDetails?.title}</b></h3>
          <div style={{ display: 'flex', color: '#35CEB3' }}>
            <p style={{ color: '#7B7B7B', marginRight: '7px' }}> by </p>
            <p>{productDetails?.title}</p>
          </div>
          <h5 style={{
            color: 'white',
            paddingBottom: '15px',
            paddingTop: '15px',
            fontFamily: 'Poppins',
          }}
          >
            PRODUCT DETAILS
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
            <p>Standard License</p>
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
            { bool === false
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
      <Footer /> */}
    </>
  );
}
