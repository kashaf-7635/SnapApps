import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '',
  imageUri: '',
  location: {},
  address: '',
};

const placeFormSlice = createSlice({
  name: 'placeForm',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setImageUri(state, action) {
      state.imageUri = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    resetForm(state) {
      return initialState;
    },
  },
});

export const {setTitle, setImageUri, setLocation, setAddress, resetForm} =
  placeFormSlice.actions;

export default placeFormSlice.reducer;
