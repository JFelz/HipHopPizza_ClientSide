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

const getSingleProduct = (Id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/products/${Id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllProducts,
  getSingleProduct,
};
