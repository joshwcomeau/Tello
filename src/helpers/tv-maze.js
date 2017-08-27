import { stripHTMLFromString } from '../utils';


export const getSearchEndpoint = query => (
  `http://api.tvmaze.com/search/shows?q=${query}`
);

export const formatSearchResults = results => (
  results.map(({show}) => ({
    id: show.id,
    name: show.name,
    image: show.image && show.image.medium,
    status: show.status,
    type: show.type,
    summary: stripHTMLFromString(show.summary),
    region: show.network && show.network.country && show.network.country.code,
  }))
);
