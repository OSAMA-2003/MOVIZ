import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from '../slices/FavoriteSlice'
import  loaderReducer  from "../slices/Loader";


const Store = configureStore({
    reducer:{
        favorites:favoritesReducer,
        loader:loaderReducer,

    }

})

export default Store;