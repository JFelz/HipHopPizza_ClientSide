import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

export default function SignUp() {
  const [validCashier, setValidCashier] = useState();
  const { user } = useAuth();

  const checkingUser = () => {
    getSingleUser(user.uid).then(setValidCashier);
  };

  useEffect(() => {
    checkingUser();
  });
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
        {!validCashier ? (
          <>
            <h1>Sign Up</h1>
            <p>Please add user information before proceeding.</p>
            <Link href="/User/new" passHref>
              <Button>Add User Information</Button>
            </Link>
          </>
        ) : (
          <Button href="#" variant="secondary" size="lg" disabled>
            Sorry, this Form is closed. If you want to edit your profile information, proceed to the Profile page.
          </Button>
        ) }
      </div>
    </>
  );
}
