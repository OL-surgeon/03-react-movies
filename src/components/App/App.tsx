"use client";

import type { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "..//MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import "./App.css";
import { fetchMovies } from "../services/movieService";

const API_KEY = "8eb1c75e4a3c54065cc5bf123fd08d70"; // заміни на свій ключ

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
