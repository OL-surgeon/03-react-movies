import axios, { AxiosResponse } from "axios";
import { Movie } from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWIxYzc1ZTRhM2M1NDA2NWNjNWJmMTIzZmQwOGQ3MCIsIm5iZiI6MTc1MTkwMjE3MS45Njg5OTk5LCJzdWIiOiI2ODZiZTdkYjE0YTNlYTkxNzBhOTU5NmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GYohKA8kG-mq6w5l1xYAupL1WpKLM0XD2EGeEHro_z8"; // заміни на реальний токен

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: TOKEN,
    },
  };

  const response: AxiosResponse<TMDBResponse> = await axios.get(
    `${BASE_URL}/search/movie`,
    config
  );

  return response.data.results;
};
