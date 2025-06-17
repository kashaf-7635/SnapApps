import axios from 'axios';
import {API_KEY} from '@env';

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return res.data;
};

export const createUser = (email, password) => {
  return authenticate('signUp', email, password);
};

export const loginUser = (email, password) => {
  return authenticate('signInWithPassword', email, password);
};
