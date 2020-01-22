const apiURL = 'http://localhost:3000/api';
const shopsAPI = {
  get: async () => {
    const response = await fetch(`${apiURL}/shops`)
      .then(response => response.json())
      .catch(err => err);
    if (response)
      return response;
  },
  search: async (keyword) => {
    const response = await fetch(`${apiURL}/shops/search?keyword=${keyword || ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => data.data)
      .catch(err => err);
    if (response)
      return response;
  },
  create: async (data) => {
    const response = await fetch(`${apiURL}/shops`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
      .catch(err => err);
    if (response) {
      return response;
    }
  },
  update: async (id, data) => {
    const response = await fetch(`${apiURL}/shops/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
      .catch(err => err);
    if (response) {
      return response
    }
  },
  delete: async (id) => {
    const response = await fetch(`${apiURL}/shops/${id}`,
      {
        method: 'DELETE'
      }).then(response => response.json())
      .catch(err => err);
    if (response)
      return response;
  }
};

export default shopsAPI;