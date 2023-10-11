import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';

export default function UserProfile() {
  const [userObj, setUserObj] = useState();
  const router = useRouter();
  const { user } = useAuth();
  const { uid } = router.query;

  useEffect(() => {
    getSingleUser(uid).then((details) => {
      if (details) {
        setUserObj(details);
      }
    });
  });

  return (
    <>
      <div className="profileContainer">
        <div className="userObj">
          <div style={{ padding: '20px' }}>
            <Image
              src={userObj?.ImageURL}
              className="profileImage"
            />
          </div>
          <div style={{ marginTop: '5px', marginBottom: '20px' }}>
            <h1>{userObj?.Name}</h1>
          </div>
          <div className="profileDetails">
            <h4 style={{ marginBottom: '20px' }}>Personal Details</h4>
            <h5>Email</h5>
            <p>{userObj?.email}</p>
            <h5>About Me</h5>
            <p>{userObj?.PhoneNumber}</p>
          </div>
          {userObj ? (
            <div>
              <Link href={`/User/edit/${user.uid}`} passHref>
                <Button>Edit Profile</Button>
              </Link>
            </div>
          ) : (
            <>
              <h4>
                No User Information: Please Proceed to the Home page.
              </h4>
              <Link href="/" passHref>
                <Button variant="warning" size="lg">
                  HomePage
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
