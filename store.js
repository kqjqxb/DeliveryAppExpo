import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice"
import restaurantReducer from "./features/restaurantSlice"
import navReducer from "./slices/navSlice"

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        restaurant: restaurantReducer,
        nav: navReducer,
    },
})