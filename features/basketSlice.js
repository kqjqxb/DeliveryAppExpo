import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];
      if(index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn (
          `Can't remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
    clearBasket: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
})

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

// MEMOIZED selector factory: call selectBasketItemsWithId(id) to get a selector(state) => items[]
export const selectBasketItemsWithId = (id) => createSelector(
  [selectBasketItems],
  (items) => items.filter((item) => item.id === id)
);

// simple total selector (keeps current behavior)
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) =>
  total += item.price, 0)

export default basketSlice.reducer