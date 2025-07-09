import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWIxYzc1ZTRhM2M1NDA2NWNjNWJmMTIzZmQwOGQ3MCIsIm5iZiI6MTc1MTkwMjE3MS45Njg5OTk5LCJzdWIiOiI2ODZiZTdkYjE0YTNlYTkxNzBhOTU5NmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GYohKA8kG-mq6w5l1xYAupL1WpKLM0XD2EGeEHro_z8";

export const fetchMovies = async (query: string) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  return response.data.results;
};
