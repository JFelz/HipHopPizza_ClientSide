import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productData';

export default function DeleteMe() {
  const [test, setTest] = useState([]);

  const newTest = () => {
    getAllProducts().then(setTest);
    console.log('Tab2 Products:', test);
  };

  useEffect(() => {
    newTest();
  }, []);
  return (
    <>
      <div>
        <h1>{test?.map((prod) => prod.title)}</h1>
      </div>
    </>
  );
}
