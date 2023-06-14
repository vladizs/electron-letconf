import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030/api/',
  withCredentials: true,
});

async function login(username: string, password: string) {
  return await instance.post('/auth/login', {
    username,
    password,
  });
}

const auth = {
  login,
};

async function getMeetings() {
  return await instance.get('/meeting/list');
}

async function getMeetingById(id: string) {
  return await instance.get(`/meeting/s/${id}`);
}

const meetings = {
  getMeetings,
  getMeetingById,
};

export { auth, meetings };
