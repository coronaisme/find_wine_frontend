const API = `http://localhost:3000`

const token = localStorage.getItem('token')


const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
};

const login = (name, password) => {
  return fetch(`${API}/api/v1/auth`, {
    method: "POST",
    headers:headers,
    body: JSON.stringify({
    name, password
    })
  }).then(res => res.json())
}

const getCurrentUser = () => {
  return fetch(`${API}/api/v1/users/current_user`, {
    headers:headers
  }).then(res => res.json())
}

export const getWines = () => {
 return fetch(`${API}/api/v1/wines`).then(res => res.json()) 
}

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser
  }
}