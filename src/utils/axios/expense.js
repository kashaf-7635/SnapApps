import axios from './axios';

export const storeExpense = async expenseData => {
  const res = await axios.post('/expenses.json', expenseData);
  return res.data.name;
};

export const getExpenses = async () => {
  const res = await axios.get('/expenses.json');
  const expenses = [];
  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = async (id, expenseData) => {
  return axios.put(`/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async id => {
  return axios.delete(`/expenses/${id}.json`);
};
