import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const createSession = (userId) => {
  const sessionId = uuidv4();
  const config = {
    method: 'POST',
    url: '/sessions',
    data: {
      session_id: sessionId,
      user_id: userId,
    },
  };
  return axios(config)
    .catch((err) => console.log('error registering session', err));
};

export const checkSession = (sessionId) => {
  const config = {
    method: 'GET',
    url: '/sessions',
    params: {
      session_id: sessionId,
    },
  };
  return axios(config);
}