import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../api/userData';
import { getAllProducts } from '../api/productData';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';

// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

function Home() {
  const [checkedIn, setCheckedIn] = useState();
  const [products, setProducts] = useState();
  const { user } = useAuth();
  const router = useRouter();

  const getProducts = () => {
    getAllProducts().then(setProducts);
    console.log('got products:', products?.map((prod) => prod.title));
  };

  const checkingUser = () => {
    getSingleUser(user.uid).then(setCheckedIn);
  };

  useEffect(() => {
    checkingUser();
    getProducts();
  }, []);

  return (
    <>
      <h1>Menu</h1>
      <div
        className="menuSectionDiv"
      >
        {!checkedIn ? (
          () => { router.push('/SignUp'); }
        ) : (
          <>
            <div className="ProductCard">
              {products?.map((prod) => <ProductCard ProdArr={prod} key={prod.id} />)}
            </div>
          </>
        ) }
      </div>
    </>
  );
}

export default Home;
