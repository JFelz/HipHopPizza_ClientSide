const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/cashier/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const getAllUser = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7143/cashier', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const updateUser = (uid, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/cashier/update/${uid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7143/cashier/return/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

export {
  updateUser,
  getUserById,
  getSingleUser,
  getAllUser,
};
