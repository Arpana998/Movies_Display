import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import InputForm from './components/InputForm';

localStorage.removeItem("id")
let i = "";

function App() {
  
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  
  
  const fetchMoviesHandler = useCallback( async() => {
    setIsLoading(true);
    setError(null);
    try {
      let response = await fetch('https://swapi.dev/api/films')
      if(!response.ok){
        throw new Error('Something went wrong')
      }
      
      
      const data = await response.json();
      
       
          const MoviesData = data.results.map(movie => {
            return{
              id: movie.episode_id,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date
            }
          })
          setMovies(MoviesData)
          console.log(MoviesData);
        }
    catch(error) {
      setError(error.message)
      if(!i){
        
        console.log("retrying")
        i = setInterval(fetchMoviesHandler, 5000)
        
      }
    }
    setIsLoading(false)
  }, []);

  useEffect(()=>{
    fetchMoviesHandler()
  },[])

  const formDataHandler = (movie) => {
    console.log(movie)
  }
  //useEffect takes call back function and dependencies hence we converted function into callback
  //so after rendering function there will no movie data on screen as that would be executed on clicking
  //button, but we want to get movie data on 1st time page is loaded , useEffect executes after whole 
  //component is render hence by tranforming function in call back we passed it in useEffect to be ren
  //der 1st timewhen screen loads
  // const cbFunction = () => { }
  //useEffect(cbFunction,[])
  
  let content  = <p>No Movie Found</p>
  if (movies.length > 0){
    content = <MoviesList movies={movies} />
  } 
 
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <InputForm onAddMovie={formDataHandler}/>
      <section>
        <button onClick = {fetchMoviesHandler}>Fetch Movies</button>
        { error && <button onClick = {() => {
          let intervalId = 
          clearInterval(i);
           setError("cancel retrying")} }>Cancel</button>}
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading....</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
  }

export default App;
