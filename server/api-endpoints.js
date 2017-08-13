TV_MAZE = {
  search: (query) => {
    return `http://api.tvmaze.com/search/shows?q=${query}`;
  },
  shows: (id) => {
    return `http://api.tvmaze.com/shows/${id}`;
  },
  episodes: (id) => {
    return `http://api.tvmaze.com/shows/${id}/episodes`;
  }
};
