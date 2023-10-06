import {
  createSlice
} from '@reduxjs/toolkit';

//for managing a cache in redux store
const cacheSlice = createSlice({
  name: 'cache', 
  initialState: {},
  reducers: { 
    //setCacheValue updating the cache in key value pair.
    setCacheValue: (state, action) => { //current state of slice & action obj displayed by your appln
      const { key, data } = action.payload;
      state[key] = data;
    },
  },
});

export const { setCacheValue } = cacheSlice.actions;

export default cacheSlice.reducer;