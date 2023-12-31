import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';
import OrderForm from '../../../components/forms/OrderForm';
import ProductCard from '../../../components/ProductCard';
import {
  getAllDrinks, getAllPizza, getAllProducts, getAllWings,
} from '../../../api/productData';
// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

function EditOrder() {
  const [checkedIn, setCheckedIn] = useState();
  const [products, setProducts] = useState();
  const [pizzaProduct, setPizzaProduct] = useState();
  const [wingsProduct, setWingsProduct] = useState();
  const [drinksProduct, setDrinksProduct] = useState();
  const [productList, setProductList] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getProducts = () => {
    getAllProducts().then(setProducts);
    getAllPizza().then(setPizzaProduct);
    getAllWings().then(setWingsProduct);
    getAllDrinks().then(setDrinksProduct);
    console.log('got products:', products?.map((prod) => prod.title));
    console.log('got Pizza products:', pizzaProduct?.map((prod) => prod.title));
    console.log('got wings products:', wingsProduct?.map((prod) => prod.title));
    console.log('got drinks products:', drinksProduct?.map((prod) => prod.title));
  };

  // This function returns the Product Obj from the child component
  const handleCallback = (childData) => {
    // Set each Product Obj into a State array
    setProductList((prevState) => ([...prevState, childData]));
  };

  const deleteProd = (deletedItemArr) => {
    setProductList((prevProductList) => prevProductList.filter((p) => p.id !== deletedItemArr.id));
  };

  console.log('Home:', productList);

  const checkingUser = () => {
    getSingleUser(user.uid).then(setCheckedIn);
  };

  const SignUpButton = () => {
    router.push('/SignUp');
  };

  useEffect(() => {
    checkingUser();
    getProducts();
  }, []);

  return (
    <>
      {checkedIn ? (
        <h1>Welcome, {checkedIn.name}</h1>
      ) : (
        <>
          <div className="WelcomeMessage">
            <h1>New Cashier, Please Sign up!</h1>
            <Button onClick={SignUpButton}>Sign Up Page</Button>
          </div>
        </>
      )}
      <h1>Pizza</h1>
      <div className="dualWindow">
        <section className="Products">
          <div className="menuSectionDiv">
            <div className="ProductCard">
              {pizzaProduct?.map((prod) => <ProductCard ProdArr={prod} key={prod.id} parentCallback={handleCallback} />)}
            </div>
          </div>
          <br />
          <h1>Wings</h1>
          <div className="wingsSectionDiv">
            <div className="ProductCard">
              {wingsProduct?.map((prod) => <ProductCard ProdArr={prod} key={prod.id} parentCallback={handleCallback} />)}
            </div>
          </div>
          <br />
          <h1>Drinks</h1>
          <div className="drinksSectionDiv">
            <div className="ProductCard">
              {drinksProduct?.map((prod) => <ProductCard ProdArr={prod} key={prod.id} parentCallback={handleCallback} />)}
            </div>
          </div>
        </section>
        <section className="Orders">
          <div className="orderSectionBlock">
            <OrderForm productList={productList} DeletePL={deleteProd} />
          </div>
        </section>
      </div>
    </>
  );
}

export default EditOrder;
