import {createSlice} from '@reduxjs/toolkit';

const favMealsSlice = createSlice({
  name: 'favourites',
  initialState: {
    ids: [],
  },
  reducers: {
    addFavourites: (state, action) => {
      state.ids.push(action.payload); 
    },
    removeFavourites: (state, action) => {
      const index = state.ids.indexOf(action.payload); 
      if (index > -1) {
        state.ids.splice(index, 1);
      }
    },
  },
});

export const addFavourites = favMealsSlice.actions.addFavourites;
export const removeFavourites = favMealsSlice.actions.removeFavourites;
export default favMealsSlice.reducer;
