import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleUser, getProducts } from '../api/userData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

function Home() {
  const [checkedIn, setCheckedIn] = useState();
  const [products, setProducts] = useState();
  const { user } = useAuth();
  const router = useRouter();

  function getALLProducts() {
    getProducts().then(setProducts);
    console.log('got products:', products?.Title);
  }

  const checkingUser = () => {
    getSingleUser(user.uid).then(setCheckedIn);
  };

  // const routeToProfile = () => (
  //   router.push('/profile')
  // );

  useEffect(() => {
    getALLProducts();
  }, []);

  useEffect(() => {
    checkingUser();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {!checkedIn ? (
          () => { router.push('/profile'); }
        ) : (
          <>
            <h1>POS System goes here</h1>
            <h1>{products?.Title}</h1>
            <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
              Sign Out
            </Button>
          </>
        ) }
      </div>
    </>
  );
}

export default Home;
