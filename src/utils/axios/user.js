import axios from './axios';

export const storeUser = async userData => {
  const res = await axios.post('/users.json', userData);
  return res.data.name;
};

export const getUser = async uid => {
  const res = await axios.get('/users.json');

  for (const key in res.data) {
    if (res.data[key].uid === uid) {
      return res.data[key];
    }
  }
  return {};
};
