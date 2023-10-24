const getAllOrders = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/orders/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrderProductlist = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${id}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/orders/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.text();
        resolve(data);
      }
    })
    .catch(reject);
});

const updateOrder = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addProductToOrder = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${id}/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteProductInOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/orders/${orderId}/list/${productId}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllOrders,
  getSingleOrder,
  getOrderProductlist,
  createOrder,
  updateOrder,
  deleteOrder,
  addProductToOrder,
  deleteProductInOrder,
};
