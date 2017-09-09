module.exports = {
  search: (query) => {
    return `https://api.tvmaze.com/search/shows?q=${query}`;
  },
  shows: (id) => {
    return `https://api.tvmaze.com/shows/${id}`;
  },
  episodes: (id) => {
    return `https://api.tvmaze.com/shows/${id}/episodes`;
  }
};
