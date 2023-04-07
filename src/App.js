import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

localStorage.removeItem("id")
let i = "";

function App() {
  
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  
  async function fetchMoviesHandler() {
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
  }
  
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
