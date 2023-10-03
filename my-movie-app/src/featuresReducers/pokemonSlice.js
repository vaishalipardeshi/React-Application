import {
  createSlice
} from '@reduxjs/toolkit';

//Used to create redux slice 'createSlice', which includes reducers && action creators
const cacheSlice = createSlice({
  name: 'cache', //name object is name of slice
  initialState: {},//initial state of cache slice
  reducers: { //an obj defines reducer fun i.e setCacheValue
    setCacheValue: (state, action) => { //current state of slice & action obj displayed by your appln
      //key is property name,data  extract from action.payload
      const { key, data } = action.payload; //
      state[key] = data;
    },
  },
});

export const { setCacheValue } = cacheSlice.actions;

export default cacheSlice.reducer;
//redux slice for manage a cache in redux store, single reducer called setCacheValue,
//that allows you to set values in cache state.