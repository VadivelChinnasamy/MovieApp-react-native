const base_url = "http://api.themoviedb.org/3/";
const api_key = "?api_key=824e6813a740068e24a630f5083b0811";
const config = {
  movies: {
    popular: base_url + "movie/popular" + api_key,
    apiKey: api_key,
    imageBaseUrl: "http://image.tmdb.org/t/p/w185/",
    imagew500: "http://image.tmdb.org/t/p/w500/",
    bannerimageUrl: "https://image.tmdb.org/t/p/original",
    movieDetail: base_url + "movie/",
    trending: base_url + "trending/movie/day" + api_key,
    search: base_url + "search/movie" + api_key,
    TvList: base_url + "tv/popular" + api_key,
    TvDetail: base_url + "tv/"
  }
};
export default config;
