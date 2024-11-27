
import ToDoList from "../../components/todo/ToDoList"

import Movies from "../../components/movies/Movies"
import MoviesSlider from "../../components/moviesSlider/MoviesSlider"
import { useState } from "react";
import SearchBox from "../../components/searchBox/SearchBox";












function Home() {
 

  const latest = "https://api.themoviedb.org/3/discover/movie?api_key=21994b44ea3a6af47ccef5404de143d5"
  

  return (
    <>
    
    <MoviesSlider apiUrl={latest}/>
    
    <Movies searchQuery/>
    
   
    

    {/* <ToDoList/> */}

    </>
  )
}

export default Home