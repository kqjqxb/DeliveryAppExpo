import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformatios: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin:(state, action) => {
        state.origin = action.payload;
    },

    setDestination:(state, action) => {
        state.destination = action.payload;
    },

    setTravelTimeInformatios:(state, action) => {
        state.travelTimeInformatios = action.payload;
    },

  },
})

export const { setOrigin, setDestination, setTravelTimeInformatios } = navSlice.actions;

//selecters: 1 sel fo each item in initial state

export const selectOrigin = (state) => state.nav.origin;

export const selectDestination = (state) => state.nav.destination;

export const selectTimeInformatios = (state) => state.nav.travelTimeInformatios;



export default navSlice.reducer