import {createSlice} from '@reduxjs/toolkit';

const expenseTrackingSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const index = state.expenses.findIndex(
        exp => exp.id === action.payload.id,
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      } else {
        state.expenses.push(action.payload);
      }
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse()
      state.expenses = inverted;
    },
  },
});

export const addExpense = expenseTrackingSlice.actions.addExpense;
export const removeExpense = expenseTrackingSlice.actions.removeExpense;
export const setExpenses = expenseTrackingSlice.actions.setExpenses;
export default expenseTrackingSlice.reducer;
