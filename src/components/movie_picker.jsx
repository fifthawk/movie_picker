// 1. Is there a cap on the weight that I should implement?
// 2.

import React, { useState } from "react";

const MovieRandomizer = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [weight, setWeight] = useState(1);
  const [pickedMovie, setPickedMovie] = useState(null);

  const addMovie = () => {
    if (newMovie.trim().length !== 0) {
      setMovies([...movies, { name: newMovie, weight: weight }]);
      setNewMovie("");
      setWeight(1);
    }
  };

  const pickRandomMovie = () => {
    if (movies.length === 0) return;

    const totalWeight = movies.reduce((sum, movie) => sum + movie.weight, 0);
    let random = Math.random() * totalWeight;

    for (let movie of movies) {
      if (random < movie.weight) {
        setPickedMovie(movie.name);
        return;
      }
      random -= movie.weight;
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Movie Randomizer</h1>
      <div>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              {movie.name} ⚖️ = {movie.weight}
            </li>
          ))}
        </ul>
        <form onSubmit={onFormSubmit}>
          <input
            onChange={(e) => setNewMovie(e.target.value)}
            value={newMovie}
            placeholder="Despicable Me 4"
          />
          <input
            type="range"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="1"
            max="10"
          />
          <p>Weight: {weight}</p>
          <button type="submit" onClick={addMovie}>
            Add Movie
          </button>
        </form>
      </div>
      <button onClick={pickRandomMovie}> Pick Movie</button>

      {pickedMovie && (
        <div>
          <h2>Tonight's Movie:</h2>
          <p>{pickedMovie}</p>
        </div>
      )}
    </>
  );
};

export default MovieRandomizer;
