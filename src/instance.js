import axios from "axios";

import store from './components/reduxStore/store/Store'
import { toggleLoader } from "./components/reduxStore/slices/Loader";



export const instance = axios.create({
    baseURL:"https://api.themoviedb.org"
    
})

instance.interceptors.request.use((config)=>{
    
    store.dispatch(toggleLoader(true))

    return config 
})


instance.interceptors.response.use((res)=>{

    store.dispatch(toggleLoader(false))
    
    return res

})