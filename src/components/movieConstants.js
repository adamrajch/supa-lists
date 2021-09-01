// process.env.TMDB_API_KEY;
const requests = [
  {
    title: "Top Rated",
    url: `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
  },
  {
    title: "Action",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`,
  },
  {
    title: "Mystery",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=9648`,
  },
  {
    title: "Romance",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`,
  },
  {
    title: "Documentary",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=99`,
  },
  {
    title: "Animation",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=16`,
  },
  {
    title: "Thriller",
    url: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=53`,
  },
];

export default requests;
