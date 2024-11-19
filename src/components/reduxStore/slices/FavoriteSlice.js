import { createSlice } from "@reduxjs/toolkit";



const FavoriteSlice = createSlice({

    name: "favorites",
    initialState:[],
    reducers:{
        addFavorite:(state,action)=>{
            const movie = action.payload;

            if(!state.find((fav)=>fav.id === movie.id)){
                state.push(movie)
            }
        },

        removeFavorite:(state,action)=>{
            const movieId = action.payload;
            return state.filter((fav)=>fav.id !== movieId)
        }


    }


})

export const {addFavorite,removeFavorite} = FavoriteSlice.actions
export default FavoriteSlice.reducer