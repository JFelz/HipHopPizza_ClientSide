import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/orderData';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [order, setOrder] = useState([]);

  const getOrders = () => {
    getAllOrders().then(setOrder);
    console.log('Tab2 Products:', order);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="OrdersMain">
        <h1 style={{ marginBottom: '.5em' }}>Orders</h1>
        {order?.map((o) => <OrderCard key={o.id} orderObj={o} />)}
      </div>
    </>
  );
}
