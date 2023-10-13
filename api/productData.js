const getAllProducts = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getAllPizza = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/products/pizza', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllWings = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/products/wings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllDrinks = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/products/drinks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllProducts,
  getAllPizza,
  getAllDrinks,
  getAllWings,
  getSingleProduct,
};
