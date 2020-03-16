const API = `http://localhost:3000`

const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
};

const login = (username, password) => {
  return fetch(`${API}/auth/`, {
    method: "POST",
    headers:headers,
    body: JSON.stringify({
      username, password
    })
  }).then(res => res.json())
}

const getCurrentUser = () => {
  return fetch(`${API}/current_user`, {
    headers:headers
  }).then(res => res.json())
}

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser
  }
}